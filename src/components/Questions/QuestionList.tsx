import { Answer, OptionVariant, Optional } from "../../types";
import { QuestionNumberButton } from "./QuestionNumberButton";
import { getButtonvariant } from "./utils";

const styles = {
  width: "92vw",
  display: "grid",
  gridGap: "2px",
  justifyContent: "center",
  gridTemplateColumns: "repeat(auto-fill, 3em)",
};

type Props = {
  currentQuestionIndex: number;
  answers: Array<Answer>;
  onSelect: (questionNumber: number) => void;
  setVisible: (isVisible: boolean) => void;
  isVisible: boolean;
};

export function QuestionList({
  answers,
  onSelect,
  currentQuestionIndex,
  isVisible,
  setVisible,
}: Props) {
  return (
    <nav style={styles}>
      {answers.map(({ questionNumber, correctAnswer, answer }) => {
        const questionIndex = parseInt(questionNumber) - 1;
        const hasFocus = isVisible && currentQuestionIndex === questionIndex;
        const buttonVariant = getButtonvariant(answer, correctAnswer);

        const handleButtonClick = () => {
          onSelect(questionIndex);
          setVisible(false);
        };

        return (
          <QuestionNumberButton
            key={questionNumber}
            onClick={handleButtonClick}
            hasFocus={hasFocus}
            variant={buttonVariant}
            tabIndex={isVisible ? 0 : -1}
          >
            {questionNumber}
          </QuestionNumberButton>
        );
      })}
    </nav>
  );
}
