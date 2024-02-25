import { Answer } from "../../types";
import { QuestionList } from "./QuestionList";
import { QuestionListPanel } from "./QuestionListPanel";
import { QuestionListFooter } from "./QuestionListFooter";

type Props = {
  currentQuestionIndex: number;
  answers: Array<Answer>;
  onQuestionSelect: (questionNumber: number) => void;
  setVisible: (isVisible: boolean) => void;
  onResetAnswers: () => void;
  isVisible: boolean;
};

export function Questions({
  answers,
  onQuestionSelect,
  currentQuestionIndex,
  isVisible,
  setVisible,
  onResetAnswers,
}: Props) {
  return (
    <>
      <QuestionListPanel isVisible={isVisible}>
        <QuestionList
          currentQuestionIndex={currentQuestionIndex}
          answers={answers}
          onSelect={onQuestionSelect}
          isVisible={isVisible}
          setVisible={setVisible}
        />
      </QuestionListPanel>
      <QuestionListFooter
        isVisible={isVisible}
        setVisible={setVisible}
        onResetAnswers={onResetAnswers}
      />
    </>
  );
}
