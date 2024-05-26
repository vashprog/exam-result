const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  courseCode: {
    type: String,
    required: true,
    unique: true,
  },
  department: {
    type: String,
    required: true,
    unique: false,
  },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
