import { forwardRef, useEffect, useState } from "react";

import { Answer } from "../types";

import { Button } from "./Button";
import { QuestionListButton } from "./QuestionListButton";

type Props = {
  currentQuestionIndex: number;
  answers: Array<Answer>;
  chooseQuestion: (questionNumber: number) => void;
  setVisible: (isVisible: boolean) => void;
  isVisible: boolean;
};

export const QuestionList = forwardRef(function QuestionList(
  {
    answers,
    isVisible,
    chooseQuestion,
    setVisible,
    currentQuestionIndex,
  }: Props,
  ref: any
) {
  const [questionListHeight, setQuestionListHeight] = useState(0);

  useEffect(function updateQuestionListElementHeight() {
    const handleResize = () => {
      setQuestionListHeight(ref?.current?.offsetHeight || 0);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div
        ref={ref}
        aria-hidden={isVisible}
        style={{
          marginTop: isVisible ? "2rem" : `-${questionListHeight + 16}px`, //16 (1rem) because of the marginBottom
          transform: `scale(${isVisible ? "1" : "0.95"})`,
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
                key={questionId}
                onClick={() => {
                  chooseQuestion(questionIndex);
                  setVisible(false);
                }}
                hasFocus={isVisible && currentQuestionIndex === questionIndex}
                variant={variant}
                tabIndex={isVisible ? 0 : -1}
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
          ...(!isVisible && { borderRadius: "0 0 8px 8px" }),
        }}
        onClick={() => setVisible(!isVisible)}
      >
        {`${isVisible ? "Hide" : "Show"} question list`}
      </Button>
    </>
  );
});
