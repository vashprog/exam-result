const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  enrollmentNumber: {
    type: Number,
    ref: "Student",
    required: true,
  },
  course: {
    type: String,
    ref: "Course",
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  marks: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  grade: {
    type: String,
    required: true,
    enum: ["A", "B", "C", "D", "F"],
  },
  department: {
    type: String,
    required: true,
    unique: false,
  },
});

const Exam = mongoose.model("Exam", examSchema);

module.exports = Exam;
