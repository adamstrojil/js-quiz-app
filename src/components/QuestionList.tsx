import { Answer } from "../types";
import { QuestionListButton } from "./QuestionListButton";

type Props = {
  answers: Array<Answer>;
  showQuestion: (questionNumber: number) => void;
  setVisible: (isVisible: boolean) => void;
};

export function QuestionList({ answers, showQuestion, setVisible }: Props) {
  return (
    <nav
      style={{
        width: "92vw",
        display: "grid",
        gridGap: "2px",
        justifyContent: "center",
        gridTemplateColumns: "repeat(auto-fill, 3em)",
      }}
    >
      {answers.map(({ questionId, correctAnswer, answer }) => {
        const questionIndex = parseInt(questionId) - 1;
        const answeredCorrectly = correctAnswer === answer;
        const variant = answer
          ? answeredCorrectly
            ? "correct"
            : "wrong"
          : "notAnswered";

        return (
          <QuestionListButton
            onClick={() => {
              showQuestion(questionIndex);
              setVisible(false);
            }}
            variant={variant}
          >
            {questionId}
          </QuestionListButton>
        );
      })}
    </nav>
  );
}
