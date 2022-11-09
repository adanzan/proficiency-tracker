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
  // Map on each question to fill out the empty array
  const initialQuizState = [];
  data.map((q) => {
    initialQuizState.push({ id: q.qID, answer: "" });
  });
  //console.log(initialQuizState);

  // Each quiz has one quiz state that gets updated when we click submit
  const [quizState, setQuizState] = useState(initialQuizState);
  const handler = (qID, selectedAnswer) => {
    const quizStateCopy = [...quizState];
    // Take the old answer out
    quizStateCopy.filter((element) => element.id !== qID);
    //console.log(quizStateCopy);
    quizStateCopy.push({ id: qID, answer: selectedAnswer });
    setQuizState(quizStateCopy);
    console.log(quizStateCopy);
  };

  //Update quizState
  //setQuizState()
  // Maybe deep copy the setquizstate and then change the specific id for it

  const filteredQuestions = data.map((q) => {
    //to filter which questions go in, placeholder
    //if condition is met create a Question object and add it to questions list
    for (let i = 0; i < learningGoals.length; i++) {
      if (q["learningGoal"] === parseInt(learningGoals[i])) {
        return (
          <li key={q.question}>
            <Question question={q} selectAnswer={handler} />
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
