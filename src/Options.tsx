import { Answer, OptionVariant, Option as OptionType, Question } from "./types";
import "./App.css";
import { Option } from "./Option";

type Props = {
  question: Question;
  answers: Array<Answer>;
  questionAnswered: boolean;
  setAnswers: (answers: Array<Answer>) => void;
};

//Disgusting, refactor
export function Options({
  question,
  setAnswers,
  answers,
  questionAnswered,
}: Props) {
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
        const optionText = `${id}:  ${option}`;

        const rightAnswer = question.correctAnswer === id;
        const questionAnsweredIncorrectly =
          answers[parseInt(question.id) - 1].answer === id;

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
              updateAnswers={setAnswers}
              variant={optionVariant}
              disabled={questionAnswered}
              id={id}
              answers={answers}
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
