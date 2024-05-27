const express = require("express");
const router = express.Router();
const Student = require("../models/studentModel");
const Exam = require("../models/examModel");

router.get("/toppers/:departmentName", async (req, res) => {
  try {
    const { departmentName } = req.params;

    const topToppers = await Exam.aggregate([
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
          _id: "$enrollmentNumber",
          totalMarks: { $sum: "$marks" },
        },
      },
      { $sort: { totalMarks: -1 } },
      { $limit: 10 },
    ]);

    const topToppersWithDetails = await Promise.all(
      topToppers.map(async (topper) => {
        const studentDetails = await Student.findOne({
          enrollmentNumber: topper._id,
        });
        return { student: studentDetails, totalMarks: topper.totalMarks };
      })
    );

    res.json({ averageMarks: 0, topToppers: topToppersWithDetails }); // Ensure consistent response structure
  } catch (error) {
    console.error("Error retrieving top toppers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
