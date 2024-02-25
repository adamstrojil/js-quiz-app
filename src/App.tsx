import { useEffect, useRef, useState } from "react";

import questionsJSON from "../public/questions.json";
import { scrollTo } from "./utils";

import "./App.css";
import { Questions } from "./components/Questions";
import { Options } from "./components/Options/Options";
import { Answer, Optional, Question } from "./types";
import { Button } from "./components/Shared/Button";
import { Explanation } from "./components/Explanation/Explanation";
import { Footer } from "./components/Footer";
import { CodeArea } from "./components/CodeArea";
import { Title } from "./components/Shared";
import { PageLayout } from "./PageLayout";
import { QuestionPage } from "./QuestionPage";
import { getQuestionTitle } from "./components/Questions/utils";

const LOCAL_STORAGE_KEY = "questions";

export function App() {
  useEffect(function loadQuestionsFromLocalStorage() {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
      setQuestions(JSON.parse(savedData));
    }
  }, []);

  const saveQuestionsToLocalStorage = (questions: Array<Question>) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(questions));
  };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionListVisible, setQuestionListVisible] = useState(false);
  const [questionVisible, setQuestionVisible] = useState(true);
  const [questions, setQuestions] = useState<Array<Question>>(
    questionsJSON.map((question) => ({ ...question, answer: null }))
  );
  const nextButtonRef = useRef<Optional<HTMLButtonElement>>(null);
  const questionTitleRef = useRef<Optional<HTMLHeadingElement>>(null);

  const answers: Array<Answer> = questions.map(
    ({ id, correctAnswer, answer }) => ({
      questionNumber: id,
      correctAnswer,
      answer,
    })
  );
  const currentQuestion = questions[currentQuestionIndex];
  const questionTitle = getQuestionTitle(currentQuestion);
  const { code, explanation, answer } = currentQuestion;
  const isQuestionAnswered = !!answer;

  useEffect(
    function focusNextButtonAfterAnswer() {
      if (isQuestionAnswered) {
        scrollTo({ ref: nextButtonRef, id: null, duration: 1000 }); //https://www.ackee.agency/blog/scroll-to-element-with-react-and-vanilla-javascript
        nextButtonRef?.current?.focus();
      }
    },
    [isQuestionAnswered]
  );

  const resetAnswers = () => {
    if (confirm("Are you sure you want to delete ALL recorder answers?")) {
      localStorage.clear();
      setQuestions((questions) =>
        questions.map((question) => ({ ...question, answer: null }))
      );
      setCurrentQuestionIndex(0)
    }
  };

  const hasNextQuestion = currentQuestionIndex < questions.length - 1;
  const hasPreviousQuestion = currentQuestionIndex > 0;

  const displayNextQuestion = () => {
    setCurrentQuestionIndex((index) => index + 1);
    questionTitleRef.current?.focus();
  };
  const displayPreviousQuestion = () => {
    setCurrentQuestionIndex((index) => index - 1);
    questionTitleRef.current?.focus();
  };

  const animateQuestionTransition = (changeQuestion: () => void) => {
    setQuestionVisible(false);
    setTimeout(() => {
      changeQuestion();
      setQuestionVisible(true);
    }, 400);
  };

  const recordAnswer = (questionId: string, answer: Optional<string>) => {
    const updatedQuestions = questions.map((question) =>
      question.id === questionId ? { ...question, answer } : question
    );
    saveQuestionsToLocalStorage(updatedQuestions);
    setQuestions(updatedQuestions);
  };

  const previousQuestionButton = (
    <Button
      variant="small"
      onClick={() => {
        animateQuestionTransition(displayPreviousQuestion);
      }}
    >
      &#8592; Previous
    </Button>
  );

  const nextQuestionButton = (
    <Button
      ref={nextButtonRef}
      onClick={() => {
        animateQuestionTransition(displayNextQuestion);
      }}
    >
      Next question &#8594;
    </Button>
  );

  return (
    <PageLayout
      navigation={
        <Questions
          answers={answers}
          isVisible={questionListVisible}
          setVisible={setQuestionListVisible}
          currentQuestionIndex={currentQuestionIndex}
          onQuestionSelect={setCurrentQuestionIndex}
          onResetAnswers={resetAnswers}
        />
      }
      footer={<Footer />}
    >
      <QuestionPage
        isQuestionVisible={questionVisible}
        isQuestionListVisible={questionListVisible}
      >
        <Title ref={questionTitleRef} text={questionTitle} />
        <CodeArea code={code} />
        <Options question={currentQuestion} onAnswerSelect={recordAnswer} />
        {isQuestionAnswered && (
          <div className="answerRevealArea">
            <Explanation text={explanation} />
            {hasPreviousQuestion && previousQuestionButton}
            {hasNextQuestion && nextQuestionButton}
          </div>
        )}
      </QuestionPage>
    </PageLayout>
  );
}
