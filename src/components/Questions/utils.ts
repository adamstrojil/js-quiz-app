import { OptionVariant, Optional, Question } from "../../types";

export const getButtonvariant = (
  answer: Optional<string>,
  correctAnswer: string
): OptionVariant => {
  const isAnsweredCorrectly = correctAnswer === answer;
  const buttonVariant = answer
    ? isAnsweredCorrectly
      ? "correct"
      : "incorrect"
    : "notAnswered";

  return buttonVariant;
};

export const getQuestionTitle = ({ id, question }: Question) => `${id}. ${question}`;
