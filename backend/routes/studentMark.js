const express = require("express");
const router = express.Router();
const Student = require("../models/studentModel");
const Exam = require("../models/examModel");


router.get("/marks/:enrollmentNumber", async (req, res) => {
  const enrollmentNumber = req.params.enrollmentNumber;

  try {
    const student = await Student.findOne({ enrollmentNumber });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    const exams = await Exam.find({ enrollmentNumber: student.enrollmentNumber });

    let totalMarks = 0;
    exams.forEach((exam) => {
      totalMarks += exam.marks;
    });
    const totalExams = exams.length;
    const percentage = ((totalMarks / (totalExams * 100)) * 100).toFixed(2);

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
