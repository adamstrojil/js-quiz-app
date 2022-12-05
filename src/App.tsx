import { useEffect, useRef, useState } from "react";
import Highlight from "react-highlight";

import questionsJSON from "../public/questions.json";

import "./App.css";
import { QuestionList } from "./QuestionList";
import { Options } from "./Options";
import { TextWithCodeHighlight } from "./TextWithCodeHighlight";
import { Answer, Question } from "./types";

function App() {
  const [questionListHeight, setQuestionListHeight] = useState(0);
  const questionListElementRef = useRef<any>(null); //TODO type
  const nextButtonRef = useRef<any>(null); //TODO type

  useEffect(function getQuestionListElementHeight() {
    setQuestionListHeight(questionListElementRef.current.offsetHeight || 0);
  }, []);

  const [currentQuestionID, setCurrentQuestionID] = useState(0);
  const [questionListVisible, setQuestionListVisible] = useState(false);
  const [questions, setQuestions] = useState<Array<Question>>(
    questionsJSON.map((question) => ({ ...question, answer: null }))
  );
  const question = questions[currentQuestionID];
  const answered = !!questions[parseInt(question.id) - 1].answer;
  const answers: Array<Answer> = questions.map(
    ({ id, correctAnswer, answer }) => ({
      questionId: id,
      correctAnswer,
      answer,
    })
  );

  useEffect(
    function focusNextButtonWhenQuestionAnswered() {
      answered && nextButtonRef?.current?.focus();
    },
    [answered]
  );

  const updateAnswer = (questionId: string, answer: string | null) => {
    setQuestions(
      questions.map((question) =>
        question.id === questionId ? { ...question, answer } : question
      )
    );
  };

  return (
    <>
      <div
        ref={questionListElementRef}
        style={{
          marginTop: questionListVisible
            ? "0px"
            : `-${questionListHeight + 32 + 16}px`, //TODO refactor (32 = 2rem)
          transition: "ease 0.6s",
          marginBottom: "16px",
        }}
      >
        <QuestionList
          setCurrentQuestion={setCurrentQuestionID}
          answers={answers}
        />
      </div>
      {questionListVisible ? (
        <button
          style={{ marginBottom: "48px" }}
          onClick={() => setQuestionListVisible(false)}
        >
          Hide question list
        </button>
      ) : (
        <button
          style={{ borderRadius: "0 0 8px 8px", marginBottom: "48px" }}
          onClick={() => setQuestionListVisible(true)}
        >
          Show question list
        </button>
      )}
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
            <Highlight key={currentQuestionID} className="typescript">
              <div style={{ textAlign: "left" }}>{question.code}</div>
            </Highlight>
          )}
        </div>
        <br />
        <Options
          answers={answers}
          questionAnswered={answered}
          question={question}
          updateAnswer={updateAnswer}
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

            {currentQuestionID > 0 && (
              <button
                style={{ marginRight: "8px", fontSize: ".7em" }}
                onClick={() => {
                  setCurrentQuestionID(
                    (currentQuestionID) => currentQuestionID - 1
                  );
                }}
              >
                &#8592; Previous
              </button>
            )}
            {currentQuestionID < questions.length - 1 && ( //TODO refactor
              <button
                ref={nextButtonRef}
                onClick={() => {
                  setCurrentQuestionID(
                    (currentQuestionID) => currentQuestionID + 1
                  );
                }}
              >
                Next question &#8594;
              </button>
            )}
          </>
        )}
        <footer className="read-the-docs">
          Based on Lydia Hallie's{" "}
          <a href="https://github.com/lydiahallie/javascript-questions">
            github repo
          </a>
          .
        </footer>
      </div>
    </>
  );
}

export default App;
