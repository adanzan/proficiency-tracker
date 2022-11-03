/*
    Quiz.js

    This component displays the quiz title, the question components and submit button
    It also possibly calculates the total score in the quiz
*/

import PropTypes from "prop-types";
import data from "../../data/Fake_Questions.json";
import styles from "../styles/Quiz.module.css";
import Question from "./Question.js";
import { useState } from "react";

export function Quiz({ learningGoals, handleClick }) {
  const [answer, selectAnswer] = useState();
  console.log(answer);
  //just for testing
  const filteredQuestions = data.map((q) => {
    //to filter which questions go in, placeholder
    //if condition is met create a Question object and add it to questions list
    for (let i = 0; i < learningGoals.length; i++) {
      if (q["learningGoal"] === parseInt(learningGoals[i])) {
        return (
          <li key={q.question}>
            <Question question={q} selectAnswer={selectAnswer} />
          </li>
        );
      }
    }
  });

  const condition =
    filteredQuestions === undefined ? (
      <p> No questions to display</p>
    ) : (
      <ol>{filteredQuestions}</ol>
    );

  return (
    <div className={styles.round}>
      {/* Placeholder, will need to dynamically change quiz name */}
      <h2>Quiz 1</h2>
      {condition}
      <button
        type="button"
        onClick={() => {
          handleClick();
        }}
      >
        Submit
      </button>
    </div>
  );
}

Quiz.propTypes = {
  setResult: PropTypes.func,
  calculateResults: PropTypes.func,
  learningGoals: PropTypes.array,
  handleClick: PropTypes.func,
};
