const express = require("express");
const router = express.Router();
const Student = require("../models/studentModel");

// Route to get a student by enrollment number
router.get("/students/:enrollmentNumber", async (req, res) => {
  const enrollmentNumber = req.params.enrollmentNumber;

  try {
    // Find the student by enrollment number
    const student = await Student.findOne({ enrollmentNumber });

    // Check if the student exists
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Return the student in the response
    res.json(student);
  } catch (error) {
    console.error("Error retrieving student:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
