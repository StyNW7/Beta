import Question from "../models/question.model.js";

export const fetchRandomQuestions = async (size = 2) => {
  return await Question.aggregate([{ $sample: { size } }]);
};
