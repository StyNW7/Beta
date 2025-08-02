import Question from "../models/question.model.js";
import { fetchRandomQuestions } from "../services/question.service.js";

export const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.status(200).json(question);
  } catch (error) {
    console.error("Error fetching question:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getRandomQuestions = async (req, res) => {
  try {
    const questions = await fetchRandomQuestions(2);
    res.status(200).json(questions);
  } catch (error) {
    console.error("Error fetching random questions:", error);
    res.status(500).json({ message: "Server error" });
  }
};
