const express = require("express");
const router = express.Router();
const Exam = require("../models/examModel");

router.get("/averageMarks/:departmentName", async (req, res) => {
  try {
    const { departmentName } = req.params;

    const averageMarksAggregate = await Exam.aggregate([
      {
        $lookup: {
          from: "students",
          localField: "enrollmentNumber",
          foreignField: "enrollmentNumber",
          as: "student",
        },
      },
      {
        $unwind: "$student",
      },
      {
        $match: { "student.department": departmentName },
      },
      {
        $group: {
          _id: "$student.enrollmentNumber",
          totalMarks: { $sum: "$marks" },
        },
      },
      {
        $group: {
          _id: null,
          averageMarks: { $avg: "$totalMarks" },
        },
      },
    ]);

    const averageMarks = averageMarksAggregate[0]?.averageMarks || 0;
    res.json({ averageMarks, topToppers: [] }); 
  } catch (error) {
    console.error("Error retrieving average marks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
