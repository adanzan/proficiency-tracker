/*
    Quiz.js

    This component displays the quiz title, the question components and submit button
    It also possibly calculates the total score in the quiz
*/

import PropTypes from "prop-types";
import data from "../../data/Fake_Questions.json";
import styles from "../styles/Quiz.module.css";

export function Quiz() {
  //just for testing
  const questions = data.map((question) => {
    //to filter which questions go in, placeholder
    //if condition is met create a Question object and add it to questions list
    if (question["learningGoal"] === 1) {
      return <li key={question.question}>{question.question}</li>;
    }
  });

  const condition =
    questions === undefined ? (
      <p> No questions to display</p>
    ) : (
      <ol>{questions}</ol>
    );

  return (
    <div className={styles.round}>
      {/* Placeholder, will need to dynamically change quiz name */}
      <h2>Quiz1</h2>
      {condition}
      <button>Submit</button>
    </div>
  );
}

Quiz.propTypes = {
  setResult: PropTypes.func,
  calculateResults: PropTypes.func,
};
