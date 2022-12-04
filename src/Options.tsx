import { useState } from "react";
import { Answer } from "./App";
import "./App.css";
import { TextWithCodeHighlight } from "./TextWithCodeHighlight";

type Props = {
  question: any;
  answers: Answer[];
  answered: boolean;
  setAnswers: (answers: Answer[]) => void;
};

export function Options({ question, setAnswers, answers, answered }: Props) { //Disgusting, refactor
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
      {question.options.map((option: { id: string; option: string }) => {
        const optionText = `${option.id}:  ${option.option}`;
        const answeredCorrectly = question.correctAnswer === option.id;
        const answeredIncorrectly =
          answers[parseInt(question.id) - 1].answer === option.id;

        const buttonColor = answered
          ? answeredCorrectly
            ? "#43ac9a"
            : answeredIncorrectly
            ? "#c1554c"
            : "inherit"
          : "inherit";

        {
          return (
            <button
              disabled={answered}
              onClick={() => {
                setAnswers(
                  answers.map((answer: Answer) => {
                    return answer.questionId === question.id
                      ? {
                          ...answer,
                          answer: option.id,
                        }
                      : answer;
                  })
                );
              }}
              style={{
                textAlign: "initial",
                padding: "4px 30px 3px 10px",
                marginBottom: "4px",
                backgroundColor: buttonColor,
                color: answered && answeredCorrectly ? "black" : "white",
              }}
            >
              <TextWithCodeHighlight text={optionText} />
            </button>
          );
        }
      })}
    </div>
  );
}
