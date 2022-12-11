import {
  OptionVariant,
  Option as OptionType,
  Question,
  Optional,
} from "../types";
import { Option } from "./Option";

type Props = {
  question: Question;
  updateAnswer: (questionId: string, answer: Optional<string>) => void;
};

export function Options({ question, updateAnswer }: Props) {
  const questionAnswered = !!question.answer;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        marginLeft: "auto",
        marginRight: "auto",
        width: "60vw",
      }}
    >
      {question.options.map(({ id, option }: OptionType) => {
        const optionText = `${id}: &nbsp; ${option}`;

        const rightAnswer = question.correctAnswer === id;
        const questionAnsweredIncorrectly = question.answer === id;

        const optionVariant: OptionVariant = questionAnswered
          ? rightAnswer
            ? "Correct"
            : questionAnsweredIncorrectly
            ? "Incorrect"
            : "NotAnswered"
          : "NotAnswered";

        {
          return (
            <Option
              updateAnswer={updateAnswer}
              variant={optionVariant}
              disabled={questionAnswered}
              id={id}
              question={question}
              text={optionText}
              answered={questionAnswered}
            />
          );
        }
      })}
    </div>
  );
}
