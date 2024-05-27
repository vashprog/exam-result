const express = require("express");
const router = express.Router();
const Student = require("../models/studentModel");
const Exam = require("../models/examModel");

// Route to get all marks for all exams for a student by enrollment number
router.get("/marks/:enrollmentNumber", async (req, res) => {
  const enrollmentNumber = req.params.enrollmentNumber;

  try {
    // Find the student by enrollment number
    const student = await Student.findOne({ enrollmentNumber });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Find all exams for the student
    const exams = await Exam.find({ enrollmentNumber: student.enrollmentNumber });

    let totalMarks = 0;
    exams.forEach((exam) => {
      totalMarks += exam.marks;
    });
    const totalExams = exams.length;
    const percentage = ((totalMarks / (totalExams * 100)) * 100).toFixed(2);

    // Return the list of exams, total marks, percentage, and student name in the response
    res.json({
      studentName: student.name,
      exams,
      totalMarks,
      percentage,
    });
  } catch (error) {
    console.error("Error retrieving exams:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
