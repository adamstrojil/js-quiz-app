import { forwardRef, useEffect, useState } from "react";
import { Answer } from "../types";
import { Button } from "./Button";
import { QuestionListButton } from "./QuestionListButton";

type Props = {
  answers: Array<Answer>;
  chooseQuestion: (questionNumber: number) => void;
  setVisible: (isVisible: boolean) => void;
  visible: boolean;
};

export const QuestionList = forwardRef(function QuestionList(
  { answers, visible, chooseQuestion, setVisible }: Props,
  ref: any
) {
  const [questionListHeight, setQuestionListHeight] = useState(0);

  useEffect(function getQuestionListElementHeight() {
    setQuestionListHeight(ref?.current?.offsetHeight || 0);
  }, []);

  return (
    <>
      <div
        ref={ref}
        style={{
          marginTop: visible ? "2rem" : `-${questionListHeight + 16}px`, //16 (1rem) because of the marginBottom
          transform: `scale(${visible ? "1" : "0.9"})`,
          transition: "ease 0.5s", //TODO update with the keyframes animation
          marginBottom: "1rem",
        }}
      >
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
                  chooseQuestion(questionIndex);
                  setVisible(false);
                }}
                variant={variant}
              >
                {questionId}
              </QuestionListButton>
            );
          })}
        </nav>
      </div>
      <Button
        style={{
          marginBottom: "48px",
          ...(!visible && { borderRadius: "0 0 8px 8px" }),
        }}
        onClick={() => setVisible(visible ? false : true)}
      >
        {`${visible ? "Hide" : "Show"} question list`}
      </Button>
    </>
  );
});
