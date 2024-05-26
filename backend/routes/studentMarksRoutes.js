const express = require("express");
const router = express.Router();

const Result = require("../models/resultModel");

// Route to get marks by student ID
router.get("/marks/:studentId", async (req, res) => {
  const studentId = req.params.studentId;

  try {
    // Query the database for marks by student ID
    const marks = await Result.find({ studentID: studentId });

    // Check if student has any marks
    if (marks.length === 0) {
      return res
        .status(404)
        .json({ message: "No marks found for the student." });
    }

    // Return the marks
    res.json(marks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
