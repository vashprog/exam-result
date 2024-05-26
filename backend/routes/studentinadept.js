// studentController.js

const express = require("express");
const router = express.Router();
const Student = require("../models/studentModel");

// Route to get students in a department
// Route to get students by department name
// Route to get students by department name
router.get("/students/:departmentName", async (req, res) => {
  try {
    const departmentName = req.params.departmentName;

    // Find all students in the specified department
    const students = await Student.find({ department: departmentName });

    // Return the list of students
    res.json(students);
  } catch (error) {
    console.error("Error retrieving students:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
