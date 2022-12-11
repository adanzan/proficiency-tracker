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
import {useUser} from "../contexts/UserContext";

async function getData(learningGoals, callback) {
  const tempData = await getQuestions(learningGoals);
  callback(tempData);

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
    const index = attemptArray.findIndex((q) => q.qID === qID);
    attemptArray.splice(index, 1, { qID: qID, answer: selectedAnswer });
  };

  console.log("In quiz")

  useEffect(() => {
    getData(learningGoals, setQuizQuestions);
  }, []);

  const questions = [];

  quizQuestions.forEach(element => {
    attemptArray.push({ id: element.qID, answer: "" });
    questions.push((
      <li key={element.question}>
        <Question question={element} selectAnswer={selectAnswer} />
      </li>
    ))
  });

  //use reduce function to only show defined questions
  const condition =
    questions === [] ? (
      <p> No questions to display</p>
    ) : (
      <ol>{questions}</ol>
    );

  return (
    <div className={styles.round}>
      {/* Placeholder, will need to dynamically change quiz name */}
      <h2>Quiz 1</h2>
      {condition}
      <Button
        variant="outline-dark"
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
  data: PropTypes.any,
};
