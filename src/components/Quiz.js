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
  callback(tempData);
}
export default function Quiz({
  learningGoals,
  quizQuestions,
  setQuizQuestions,
  submitQuiz,
}) {
  // Each quiz has one quiz state that gets updated when we click submit
  //const attemptArray = Array(learningGoals.length).fill({ id: q.qID, answer: "" });
  const attemptArray = [];
  // quizQuestions.forEach((element) => {
  //   attemptArray.push({ id: element.qID, answer: "" });
  // });

  const selectAnswer = (qID, selectedAnswer) => {
    const index = attemptArray.findIndex((q) => q.qID === qID);
    console.log(index);
    attemptArray.splice(index, 1, { qID: qID, answer: selectedAnswer });
    console.log("Attempted array: ", attemptArray);

    // Validate that quiz has been fully answered
    // const validation = attemptArray.every((attempt) =>
    //   Object.values(attempt).every((question) => question)
    // );
    // console.log("Quiz validated: ", validation);

    // Commented out setting state for validation, since it's not properly displaying wrong and correct answers
    // if (validation) {
    //   console.log("Quiz validation is true");
    //   setIsFullyAnswered(validation);
    // }
  };

  // console.log("In quiz");

  useEffect(() => {
    getData(learningGoals, setQuizQuestions);
  }, []);

  const questions = [];

  quizQuestions.forEach((element) => {
    attemptArray.push({ qID: element.qID, answer: "" });
    questions.push(
      <li key={element.question}>
        <Question question={element} selectAnswer={selectAnswer} />
      </li>
    );
  });

  console.log("QUIZ QUESTIONS", quizQuestions);

  //use reduce function to only show defined questions
  const condition =
    questions === [] ? <p> No questions to display</p> : <ol>{questions}</ol>;

  return (
    <div className={styles.round}>
      Placeholder, will need to dynamically change quiz name
      <h2>Quiz 1</h2>
      {condition}
      <Button
        variant="outline-dark"
        // disabled={!isFullyAnswered}
        onClick={() => {
          submitQuiz(attemptArray, quizQuestions);
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
};
