import "./App.css";
import { Answer, OptionVariant, Question } from "./types";
import { TextWithCodeHighlight } from "./TextWithCodeHighlight";

type Props = {
  id: string;
  text: string;
  disabled: boolean;
  updateAnswers: (answers: Array<Answer>) => void;
  answers: Array<Answer>;
  question: Question;
  answered: boolean;
  variant: OptionVariant;
};

export function Option({
  id,
  question,
  disabled,
  variant,
  answers,
  updateAnswers,
  answered,
  text,
}: Props) {
  const variantToColorMap = {
    Correct: "#43ac9a",
    Incorrect: "#c1554c",
    NotAnswered: "inherit",
  };

  return (
    <button
      disabled={disabled}
      onClick={() => {
        updateAnswers(
          answers.map((answer: Answer) => {
            return answer.questionId === question.id
              ? {
                  ...answer,
                  answer: id,
                }
              : answer;
          })
        );
      }}
      style={{
        textAlign: "initial",
        padding: "4px 30px 3px 10px",
        marginBottom: "4px",
        backgroundColor: variantToColorMap[variant],
        color: answered && variant === "Correct" ? "black" : "white",
      }}
    >
      <TextWithCodeHighlight text={text} />
    </button>
  );
}
