const express = require("express");
const router = express.Router();
const Student = require("../models/studentModel");
const Exam = require("../models/examModel");

// Route to get the average marks secured by students for a given department
router.get("/averageMarks/:departmentName", async (req, res) => {
  try {
    const departmentName = req.params.departmentName;

    // Aggregate query to calculate total marks secured by students for the department
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
        $match: {
          "student.department": departmentName, // Filter by department name
        },
      },
      {
        $group: {
          _id: "$student.enrollmentNumber",
          totalMarks: { $sum: "$marks" },
          count: { $sum: 1 }, // Count the number of exams
        },
      },
      {
        $group: {
          _id: null,
          averageMarks: { $avg: "$totalMarks" }, // Calculate the average marks
        },
      },
    ]);

    // Return the average marks for the department
    if (averageMarksAggregate.length > 0) {
      const averageMarks = averageMarksAggregate[0].averageMarks;
      res.json({ averageMarks });
    } else {
      res.json({ averageMarks: 0 });
    }
  } catch (error) {
    console.error("Error retrieving average marks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/coursestats", async (req, res) => {
  try {
    // Aggregate query to calculate maximum and average marks for each course
    const courseStats = await Exam.aggregate([
      {
        $group: {
          _id: "$course",
          maxMarks: { $max: "$marks" }, // Maximum marks for the course
          avgMarks: { $avg: "$marks" }, // Average marks for the course
        },
      },
    ]);

    // Return the course statistics
    res.json(courseStats);
  } catch (error) {
    console.error("Error retrieving course statistics:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
