import { Optional, OptionVariant } from "../../types";

export const getOptionVariant = ({
  id,
  answer,
  correctAnswer,
  isQuestionAnswered,
}: {
  id: string;
  answer: Optional<string>;
  correctAnswer: string;
  isQuestionAnswered: boolean;
}): OptionVariant => {
  const isCorrectAnswer = correctAnswer === id;
  const wasOptionSelected = answer === id;

  return isQuestionAnswered
    ? isCorrectAnswer
      ? "correct"
      : wasOptionSelected
      ? "incorrect"
      : "notAnswered"
    : "notAnswered";
};

export const formatOptionText = (id: string, option: string): string =>
  `${id}: &nbsp; ${option}`;
