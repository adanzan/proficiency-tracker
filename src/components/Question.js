/*
  Question.js

  The Question displays the contents of a quiz question. 

  props:
    question - the question to render (required) with properties learningGoal, question, choices, and answer
    selectAnswer - callback function to set the current answer of which answer option has been selected 
*/

import PropTypes from "prop-types";
import QuestionShape from "./QuestionShape";
import styles from "../styles/Question.module.css";
import { useState } from "react";
export default function Question({ question, selectAnswer }) {
  const [activeIndex, setActiveIndex] = useState(null);

  // Display the question title
  const questionTitle = <div> {question.question} </div>;

  // Display answer choices
  const answerChoices = question.choices.map((choice, index) => {
    return (
      <li
        className={styles.li}
        key={choice}
        style={{ fontWeight: activeIndex === index ? "bold" : "lighter" }}
        id="choice"
        onClick={() => {
          setActiveIndex(index);
          selectAnswer(choice);
        }}
      >
        {choice}
      </li>
    );
  });

  return (
    <div>
      {questionTitle}
      <ul>{answerChoices}</ul>
    </div>
  );
}

// Set question component prop types
Question.propTypes = {
  question: QuestionShape,
  selectAnswer: PropTypes.func,
};
