import { Answer, Optional, OptionVariant, Question } from "../types";
import { TextWithCodeHighlight } from "./TextWithCodeHighlight";

type Props = {
  id: string;
  text: string;
  disabled: boolean;
  updateAnswer: (questionId: string, answer: Optional<string>) => void;
  question: Question;
  answered: boolean;
  variant: OptionVariant;
};

export function Option({
  id,
  question,
  disabled,
  variant,
  updateAnswer,
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
        updateAnswer(question.id, id);
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
