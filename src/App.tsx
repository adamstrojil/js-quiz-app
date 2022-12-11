import { useEffect, useRef, useState } from "react";
import Highlight from "react-highlight";

import questionsJSON from "../public/questions.json";
import { scrollTo } from "./utils";

import "./App.css";
import { QuestionList } from "./components/QuestionList";
import { Options } from "./components/Options";
import { Answer, Optional, Question } from "./types";
import { Button } from "./components/Button";
import { Explanation } from "./components/Explanation";
import { Footer } from "./components/Footer";

const footerLink = (
  <a target="_blank" href="https://github.com/lydiahallie/javascript-questions">
    github repo
  </a>
);

export function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionListVisible, setQuestionListVisible] = useState(false);
  const [questionVisible, setQuestionVisible] = useState(true);
  const [questions, setQuestions] = useState<Array<Question>>(
    questionsJSON.map((question) => ({ ...question, answer: null }))
  );
  const questionListRef = useRef<Optional<HTMLDivElement>>(null);
  const nextButtonRef = useRef<Optional<HTMLButtonElement>>(null);
  const questionTitleRef = useRef<Optional<HTMLHeadingElement>>(null);

  const question = questions[currentQuestionIndex];
  const questionTitle = `${question.id}. ${question.question}`;
  const answered = !!question.answer;
  const answers: Array<Answer> = questions.map(
    ({ id, correctAnswer, answer }) => ({
      questionId: id,
      correctAnswer,
      answer,
    })
  );

  useEffect(
    function focusNextButtoOnQuestionAnswered() {
      if (answered) {
        scrollTo({ ref: nextButtonRef, id: null, duration: 1000 }); //https://www.ackee.agency/blog/scroll-to-element-with-react-and-vanilla-javascript
        nextButtonRef?.current?.focus();
      }
    },
    [answered]
  );

  useEffect(
    function focusTitleOnQuestionChange() {
      questionTitleRef?.current?.focus();
    },
    [currentQuestionIndex]
  );

  const hasNextQuestion = currentQuestionIndex < questions.length - 1;
  const hasPreviousQuestion = currentQuestionIndex > 0;
  const displayNextQuestion = () =>
    setCurrentQuestionIndex((index) => index + 1);
  const displayPreviousQuestion = () =>
    setCurrentQuestionIndex((index) => index - 1);
  const animateQuestionTransition = (changeQuestion: () => void) => {
    setQuestionVisible(false);
    setTimeout(() => {
      changeQuestion();
      setQuestionVisible(true);
    }, 400);
  };

  const updateAnswer = (questionId: string, answer: Optional<string>) => {
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
        <QuestionList
          currentQuestionIndex={currentQuestionIndex}
          ref={questionListRef}
          answers={answers}
          chooseQuestion={setCurrentQuestionIndex}
          isVisible={questionListVisible}
          setVisible={setQuestionListVisible}
        />
        <main
          className="App"
          style={{
            opacity: questionListVisible || !questionVisible ? "0" : "1",
            visibility: questionListVisible ? "hidden" : "visible",
            transition: "ease 0.5s",
          }}
        >
          <h1 tabIndex={-1} ref={questionTitleRef}>
            {questionTitle}
          </h1>
          <div
            style={{
              margin: "0 auto 2rem auto",
              width: "60vw",
            }}
          >
            {!!question.code && (
              <div style={{ textAlign: "left" }}>
                <Highlight key={currentQuestionIndex} className="typescript">
                  {question.code}
                </Highlight>
              </div>
            )}
          </div>
          <Options question={question} updateAnswer={updateAnswer} />
          {answered && (
            <div className="new-box">
              <Explanation text={question.description} />
              {hasPreviousQuestion && (
                <Button
                  variant="small"
                  onClick={() => {
                    animateQuestionTransition(displayPreviousQuestion);
                  }}
                >
                  &#8592; Previous
                </Button>
              )}
              {hasNextQuestion && (
                <Button
                  ref={nextButtonRef}
                  onClick={() => {
                    animateQuestionTransition(displayNextQuestion);
                  }}
                >
                  Next question &#8594;
                </Button>
              )}
            </div>
          )}
        </main>
      </div>
      <Footer>Based on Lydia Hallie's {footerLink}.</Footer>
    </div>
  );
}
