/*
    Quiz.js

    This component displays the quiz title, the question components and submit button
    It also possibly calculates the total score in the quiz
*/
import "bootstrap/dist/css/bootstrap.css";
import PropTypes from "prop-types";
import Question from "./Question.js";
// import { useState } from "react";
import Button from "react-bootstrap/Button";
import styles from "../styles/Quiz.module.css";
import { getQuestions } from "../utils/firebase-utils.mjs";
import { useEffect } from "react";

async function getData(learningGoals, callback) {
  const tempData = await getQuestions(learningGoals);

  // const tempDataArray = Object.keys(tempData).map((key) => [Number(key), tempData[key]]);
  const tempDataArray = Object.values(tempData);

  console.log(tempDataArray);
  console.log(tempData);

  const filteredQuestions = tempDataArray.map((q) => {
    //to filter which questions go in, placeholder
    //if condition is met create a Question object and add it to questions list
    for (let i = 0; i < learningGoals.length; i++) {
      if (q["learningGoal"] === parseInt(learningGoals[i])) {
        if (q) {
          quizQuestionsArray.push(q);
        }
        return (
          attemptArray.push({ id: q.qID, answer: "" }),
          (
            <li key={q.question}>
              <Question question={q} selectAnswer={selectAnswer} />
            </li>
          )
        );
      }
    }
  });

  callback(filteredQuestions);
}
export function Quiz({
  learningGoals,
  quizQuestions,
  setQuizQuestions,
  submitQuiz,
}) {
  // Each quiz has one quiz state that gets updated when we click submit
  //const attemptArray = Array(learningGoals.length).fill({ id: q.qID, answer: "" });
  const attemptArray = [];

  const selectAnswer = (qID, selectedAnswer) => {
    const index = attemptArray.findIndex((q) => q.id === qID);
    attemptArray.splice(index, 1, { id: qID, answer: selectedAnswer });
  };

  console.log(selectAnswer);

  useEffect(() => {
    getData(learningGoals, setQuizQuestions);
  }, []);

  // const quizQuestionsCopy = [...quizQuestions]

  // const filteredQuestions = quizQuestionsCopy.map((q) => {
  //   //to filter which questions go in, placeholder
  //   //if condition is met create a Question object and add it to questions list
  //   for (let i = 0; i < learningGoals.length; i++) {
  //     console.log("hello")
  //     if (q["learningGoal"] === parseInt(learningGoals[i])) {
  //       if (q) {
  //         quizQuestionsArray.push(q);
  //       }
  //       return (
  //         attemptArray.push({ id: q.qID, answer: "" }),
  //         (
  //           <li key={q.question}>
  //             <Question question={q} selectAnswer={selectAnswer} />
  //           </li>
  //         )
  //       );
  //     }
  //   }
  // });

  const filteredQuestions = quizQuestions;
  //console.log(filteredQuestions);

  //use reduce function to only show defined questions

  const condition =
    filteredQuestions === [] ? (
      <p> No questions to display</p>
    ) : (
      <ol>{filteredQuestions}</ol>
    );

  return (
    <div className={styles.round}>
      {/* Placeholder, will need to dynamically change quiz name */}
      <h2>Quiz 1</h2>
      <button onClick={() => console.log(testQuestions())}>
        Print Temp Ques
      </button>
      {condition}
      <Button
        variant="outline-dark"
        onClick={() => {
          submitQuiz(attemptArray, quizQuestionsArray);
        }}
      >
        Submit
      </Button>
    </div>
  );
}

Quiz.propTypes = {
  learningGoals: PropTypes.arrayOf(PropTypes.string).isRequired,
  quizQuestions: PropTypes.arrayOf(PropTypes.object).isRequired,
  setQuizQuestions: PropTypes.func.isRequired,
  submitQuiz: PropTypes.func.isRequired,
  data: PropTypes.any,
};
