import { Answer } from "./types";
import "./App.css";

type Props = {
  answers: Answer[];
  setCurrentQuestion: (questionNumber: number) => void;
};

export function QuestionList({ answers, setCurrentQuestion }: Props) {
  return (
    <div
      style={{
        width: "92vw",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, 3em)",
        gridGap: "2px",
        justifyContent: "center",
      }}
    >
      {answers.map(({ questionId, correctAnswer, answer }) => {
        const answered = !!answer;
        const answeredCorrectly = correctAnswer === answer;
        const questionNumber = parseInt(questionId) - 1;

        return (
          <button
            onClick={() => setCurrentQuestion(questionNumber)}
            style={{
              backgroundColor: answered
                ? answeredCorrectly
                  ? "#43ac9a"
                  : "#c1554c"
                : "",
              padding: "0.6em",
            }}
          >
            {questionId}
          </button>
        );
      })}
    </div>
  );
}
