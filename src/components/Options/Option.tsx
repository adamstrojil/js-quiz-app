import { optionVariantToBackgroundColorMap } from "../../constants";
import { Optional, OptionVariant, Question } from "../../types";
import { TextWithCodeHighlight } from "../Shared/TextWithCodeHighlight";

type Props = {
  id: string;
  text: string;
  onSelect: (questionId: string, answer: Optional<string>) => void;
  question: Question;
  isAnswered: boolean;
  variant: OptionVariant;
};

export function Option({
  id,
  question,
  variant,
  onSelect,
  isAnswered,
  text,
}: Props) {
  const backgroundColor = optionVariantToBackgroundColorMap[variant];
  const color = isAnswered && variant === "correct" ? "black" : "white";
  const styles = {
    color,
    backgroundColor,
    textAlign: "initial",
    padding: "4px 30px 3px 10px",
    marginBottom: "4px",
  } as const;

  return (
    <button
      style={styles}
      disabled={isAnswered}
      onClick={() => {
        onSelect(question.id, id);
      }}
    >
      <TextWithCodeHighlight text={text} />
    </button>
  );
}
