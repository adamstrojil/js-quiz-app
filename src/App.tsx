import { useEffect, useRef, useState } from "react";
import Highlight from "react-highlight";

import questionsJSON from "../public/questions.json";
import { scrollTo } from "./utils";

import "./App.css";
import { QuestionList } from "./components/QuestionList";
import { Options } from "./components/Options";
import { Answer, Question } from "./types";
import { Button } from "./components/Button";
import { Explanation } from "./components/Explanation";

function App() {
  const [questionListHeight, setQuestionListHeight] = useState(0);
  const questionListElementRef = useRef<HTMLDivElement | null>(null);
  const nextButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(function getQuestionListElementHeight() {
    setQuestionListHeight(questionListElementRef?.current?.offsetHeight || 0);
  }, []);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionListVisible, setQuestionListVisible] = useState(false);
  const [visible, setVisible] = useState(true);
  const [questions, setQuestions] = useState<Array<Question>>(
    questionsJSON.map((question) => ({ ...question, answer: null }))
  );
  const question = questions[currentQuestionIndex];
  const answered = !!questions[parseInt(question.id) - 1].answer;
  const answers: Array<Answer> = questions.map(
    ({ id, correctAnswer, answer }) => ({
      questionId: id,
      correctAnswer,
      answer,
    })
  );

  useEffect(
    function focusNextButtoOnQuestionAnswered() {
      //FIXME: question 30 scroll not working (smth to do with imgs)
      answered && scrollTo({ ref: nextButtonRef, id: null, duration: 1000 }); //https://www.ackee.agency/blog/scroll-to-element-with-react-and-vanilla-javascript
      answered && nextButtonRef?.current?.focus();
    },
    [answered]
  );

  const nextQuestionExists = currentQuestionIndex < questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  const updateAnswer = (questionId: string, answer: string | null) => {
    setQuestions(
      questions.map((question) =>
        question.id === questionId ? { ...question, answer } : question
      )
    );
  };

  return (
    <div
      className="wrapper"
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateRows: "1fr auto",
      }}
    >
      <div className="content">
        <div
          ref={questionListElementRef}
          style={{
            marginTop: questionListVisible
              ? "2rem"
              : `-${questionListHeight + 16}px`, //16 (1rem) because of the marginBottom
            transition: "ease 0.5s",
            marginBottom: "1rem",
          }}
        >
          <QuestionList
            answers={answers}
            showQuestion={setCurrentQuestionIndex}
            setVisible={setQuestionListVisible}
          />
        </div>
        <Button
          style={{
            marginBottom: "48px",
            ...(questionListVisible && { borderRadius: "0 0 8px 8px" }),
          }}
          onClick={() =>
            setQuestionListVisible(questionListVisible ? false : true)
          }
        >
          {`${questionListVisible ? "Hide" : "Show"} question list`}
        </Button>
        <main
          className="App"
          style={{
            opacity: questionListVisible || !visible ? "0" : "1",
            transition: "ease 0.5s",
          }}
        >
          <h2>{`${question.id}. ${question.question}`}</h2>
          <div
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              width: "60vw",
            }}
          >
            {!!question.code && (
              <Highlight key={currentQuestionIndex} className="typescript">
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
            <div className="new-box">
              <Explanation text={question.description} />
              <br />

              {!isFirstQuestion && (
                <Button
                  variant="small"
                  onClick={() => {
                    setCurrentQuestionIndex(
                      (currentQuestionIndex) => currentQuestionIndex - 1
                    );
                  }}
                >
                  &#8592; Previous
                </Button>
              )}

              {nextQuestionExists && (
                <Button
                  ref={nextButtonRef}
                  onClick={() => {
                    setVisible(false);
                    setTimeout(() => {
                      setCurrentQuestionIndex(
                        (currentQuestionIndex) => currentQuestionIndex + 1
                      );
                      setVisible(true);
                    }, 400);
                  }}
                >
                  Next question &#8594;
                </Button>
              )}
            </div>
          )}
        </main>
      </div>
      <footer
        className="read-the-docs"
        style={{ height: "2.5rem", marginTop: "2rem" }}
      >
        Based on Lydia Hallie's{" "}
        <a
          target="_blank"
          href="https://github.com/lydiahallie/javascript-questions"
        >
          github repo
        </a>
        .
      </footer>
    </div>
  );
}

export default App;
