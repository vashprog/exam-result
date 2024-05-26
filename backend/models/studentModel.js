const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  enrollmentNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
});

studentSchema.methods.calculateGPA = async function () {
  const exams = await Exam.find({ student: this._id });

  if (!exams.length) {
    return 0;
  }

  let totalPoints = 0;
  exams.forEach((exam) => {
    switch (exam.grade) {
      case "A":
        totalPoints += 4;
        break;
      case "B":
        totalPoints += 3;
        break;
      case "C":
        totalPoints += 2;
        break;
      case "D":
        totalPoints += 1;
        break;
      case "F":
        totalPoints += 0;
        break;
    }
  });

  return totalPoints / exams.length;
};

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
