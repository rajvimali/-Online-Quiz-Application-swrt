const express = require("express");
const Quiz = require("../models/quizModel");
const router = express.Router();

// Add a new quiz
router.post("/quizzes", async (req, res) => {
  try {
    const newQuiz = new Quiz(req.body);
    const savedQuiz = await newQuiz.save();
    res.status(201).json(savedQuiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all quizzes
router.get("/quizzes", async (req, res) => {
  try {
    const quizzes = await Quiz.find({});
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get quiz by ID
router.get("/quizzes/:id", async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Submit quiz answers and calculate score
router.post("/quizzes/:id/submit", async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    const userAnswers = req.body.answers;
    let score = 0;

    quiz.questions.forEach((question, index) => {
      if (question.correctAnswer === userAnswers[index]) {
        score += 1;
      }
    });

    res.json({ score });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
