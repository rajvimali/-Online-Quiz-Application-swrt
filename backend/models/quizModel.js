const mongoose = require("mongoose");

// Define the question schema
const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  choices: {
    type: [String], // Array of strings for choices
    required: true,
  },
  correctAnswer: {
    type: String,
    required: true,
  },
});

// Define the quiz schema
const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  questions: [questionSchema], // Array of questions
});

const Quiz = mongoose.model("Quiz", quizSchema);
module.exports = Quiz;
