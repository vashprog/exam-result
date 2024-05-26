const express = require("express");
const router = express.Router();
const Student = require("../models/studentModel");
const Exam = require("../models/examModel");

// Route to get top 10 toppers for a department by department name
router.get("/toppers/:departmentName", async (req, res) => {
  try {
    const departmentName = req.params.departmentName;

    // Aggregate query to calculate total marks for each student in the department
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
        $match: {
          "student.department": departmentName, // Filter by department name
        },
      },
      {
        $group: {
          _id: "$enrollmentNumber",
          totalMarks: { $sum: "$marks" },
        },
      },
      { $sort: { totalMarks: -1 } }, // Sort by total marks in descending order
      { $limit: 10 }, // Limit to top 10 students
    ]);

    // Populate student details for each top topper
    const topToppersWithDetails = await Promise.all(
      topToppers.map(async (topper) => {
        const studentDetails = await Student.findOne({
          enrollmentNumber: topper._id,
        });
        return {
          student: studentDetails,
          totalMarks: topper.totalMarks,
        };
      })
    );

    // Return the list of top toppers for the department
    res.json(topToppersWithDetails);
  } catch (error) {
    console.error("Error retrieving top toppers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
