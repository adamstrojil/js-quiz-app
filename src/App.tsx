import { useState } from "react";
import "./App.css";

import questions from "../public/questions.json";
import Highlight from "react-highlight";

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

function App() {
  const [count, setCount] = useState(0); 
  const [answerVisible, setAnswerVisible] = useState(false);
  const question = questions[count];

  return (
    <div className="App">
      <h2>{`${question.id}. ${question.question}`}</h2>
      <br />
      <div
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          width: "60vw",
        }}
      >
        {!!question.code && (
          <Highlight key={count} className="javascript">
            <div style={{ textAlign: "left" }}>{question.code}</div>
          </Highlight>
        )}
      </div>
      <br />
      <div
        style={{
          // marginLeft: "20vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          marginLeft: "auto",
          marginRight: "auto",
          width: "60vw",
        }}
      >
        {question.options.map((option, index) => {
          const optionText = `${option.id}:  ${option.option}`;
          {
            return (
              <div style={{ textAlign: "initial",    padding: "3px 30px 3px 10px" }}>
                {optionText.split("`").map((text: string, index) => {
                  if (index % 2 === 0) {
                    return text;
                  } else {
                    return (
                      <span className="inline-code">
                        <Highlight
                          key={count + "" + index}
                          className="javascript"
                        >
                          {text}
                        </Highlight>
                      </span>
                    );
                  }
                })}
                <br />
              </div>
            );
          }
        })}
      </div>
      <br />
      {!answerVisible && (
        <button
          style={{ marginRight: "16px" }}
          onClick={() => setAnswerVisible(true)}
        >
          Show answer
        </button>
      )}
      {answerVisible && (
        <>
          <h3>{`Correct answer: ${question.correctAnswer}`} </h3><br/>
          <h3>Explanation</h3>
          <article
            style={{ textAlign: "justify", width: "80vw", margin: "auto" }}
          >
            {question.description}
          </article>
          <br />

          {count > 0 && (
            <button
              style={{ marginRight: "8px", fontSize: ".7em" }}
              onClick={() => {
                setCount((count) => count - 1);
                setAnswerVisible(false);
              }}
            >
              &#8592; Previous
            </button>
          )}
          <button
            onClick={() => {
              setCount((count) => count + 1);
              setAnswerVisible(false);
            }}
          >
            Next question &#8594;
          </button>
        </>
      )}
    </div>
  );
}

export default App;
