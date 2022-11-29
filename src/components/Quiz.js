/*
    Quiz.js

    This component displays the quiz title, the question components and submit button
    It also possibly calculates the total score in the quiz
*/
import "bootstrap/dist/css/bootstrap.css";
import PropTypes from "prop-types";
import data from "../../data/Fake_Questions.json";
import Question from "./Question.js";
// import { useState } from "react";

import Button from "react-bootstrap/Button";
import styles from "../styles/Quiz.module.css";

export function Quiz({ learningGoals, submitQuiz }) {
  // Each quiz has one quiz state that gets updated when we click submit
  //const attemptArray = Array(learningGoals.length).fill({ id: q.qID, answer: "" });
  const attemptArray = [];

  const selectAnswer = (qID, selectedAnswer) => {
    const index = attemptArray.findIndex((q) => q.id === qID);
    attemptArray.splice(index, 1, { id: qID, answer: selectedAnswer });
    console.log("selectAnswer attempt", attemptArray);
  };

  const filteredQuestions = data.map((q) => {
    //to filter which questions go in, placeholder
    //if condition is met create a Question object and add it to questions list
    for (let i = 0; i < learningGoals.length; i++) {
      if (q["learningGoal"] === parseInt(learningGoals[i])) {
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

  console.log(filteredQuestions);

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
      {condition}
      <Button
        variant="outline-dark"
        onClick={() => {
          submitQuiz(attemptArray);
        }}
      >
        Submit
      </Button>
    </div>
  );
}

Quiz.propTypes = {
  //setResult: PropTypes.func,
  //calculateResults: PropTypes.func,
  learningGoals: PropTypes.array.isRequired,
  //attempt: PropTypes.arrayOf(PropTypes.object),
  //setAttempt: PropTypes.any,
  submitQuiz: PropTypes.func.isRequired,
};
