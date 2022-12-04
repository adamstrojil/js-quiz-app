import { useEffect, useState } from "react";
import "./App.css";

import questions from "../public/questions.json";
import Highlight from "react-highlight";
import { QuestionList } from "./QuestionList";
import { Options } from "./Options";
import { TextWithCodeHighlight } from "./TextWithCodeHighlight";

type Question = {
  id: string;
  question: string;
  code: string;
  options: {
    id: string;
    option: string;
  };
  description: string;
};

export type Answer = {
  questionId: string;
  correctAnswer: string;
  answer: string | null;
};

function App() {
  const [count, setCount] = useState(0);
  const question = questions[count];
  const initialAnswers: Array<Answer> = questions.map(
    ({ id, correctAnswer }) => {
      return {
        questionId: id,
        correctAnswer,
        answer: null,
      };
    }
  );
  const [answers, setAnswers] = useState(initialAnswers);
  const answered = !!answers[parseInt(question.id) - 1].answer;

  return (
    <>
      <div style={{ marginBottom: "48px" }}>
        <QuestionList setCurrentQuestion={setCount} answers={answers} />
      </div>
      <div className="App">
        <h2>{`${question.id}. ${question.question}`}</h2>
        <div
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            width: "60vw",
          }}
        >
          {!!question.code && (
            <Highlight key={count} className="typescript">
              <div style={{ textAlign: "left" }}>{question.code}</div>
            </Highlight>
          )}
        </div>
        <br />
        <Options
          answers={answers}
          answered={answered}
          question={question}
          setAnswers={setAnswers}
        />
        {answered && (
          <>
            <h3>Explanation</h3>
            <article
              style={{ textAlign: "justify", width: "80vw", margin: "auto" }}
            >
              <TextWithCodeHighlight text={question.description} />
            </article>
            <br />

            {count > 0 && (
              <button
                style={{ marginRight: "8px", fontSize: ".7em" }}
                onClick={() => {
                  setCount((count) => count - 1);
                }}
              >
                &#8592; Previous
              </button>
            )}
            {count < questions.length - 1 && (
              <button
                onClick={() => {
                  setCount((count) => count + 1);
                }}
              >
                Next question &#8594;
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default App;
