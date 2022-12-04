import { useEffect, useRef, useState } from "react";
import Highlight from "react-highlight";

import questionsJSON from "../public/questions.json";

import "./App.css";
import { QuestionList } from "./QuestionList";
import { Options } from "./Options";
import { TextWithCodeHighlight } from "./TextWithCodeHighlight";
import { Answer, Question } from "./types";

function App() {
  const [currentQuestionID, SetCurrentQuestionID] = useState(0);
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

  const updateAnswer = (questionId: string, answer: string | null) => {
    setQuestions(
      questions.map((question) =>
        question.id === questionId ? { ...question, answer } : question
      )
    );
  };

  const [height, setHeight] = useState(0);
  const elementRef = useRef<any>(null); //TODO
  
  useEffect(() => {
    setHeight(elementRef.current.offsetHeight || 0);
  }, []); //empty dependency array so it only runs once at render
  console.log('height: ', height);

  return (
    <>
      <div
        ref={elementRef}
        style={{
          marginTop: questionListVisible ? "0px" : `-${height+218}px`,
          transition: "ease 0.6s",
          marginBottom: "16px"
          // backgroundColor: "black",
        }}
      >
        <QuestionList
          setCurrentQuestion={SetCurrentQuestionID}
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
          style={{ borderRadius: "0 0 8px 8px", marginBottom: "48px", position: "sticky", top: "0" }}
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
                  SetCurrentQuestionID(
                    (currentQuestionID) => currentQuestionID - 1
                  );
                }}
              >
                &#8592; Previous
              </button>
            )}
            {currentQuestionID < questions.length - 1 && (
              <button
                onClick={() => {
                  SetCurrentQuestionID(
                    (currentQuestionID) => currentQuestionID + 1
                  );
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
