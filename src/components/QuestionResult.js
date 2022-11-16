/*
  Question.js

  The Question displays the contents of a quiz question. 

  props:
    question - the question to render (required) with properties learningGoal, question, choices, and answer
    selectAnswer - callback function to set the current answer of which answer option has been selected 
*/

import PropTypes from "prop-types";
import QuestionShape from "./QuestionShape";
import styles from "../styles/QuestionResult.module.css";

export default function QuestionResult({ question, studentAnswer }) {
  // Display the question title
  const questionTitle = <div> {question.question} </div>;

  // Display answer choices
  const answerChoices = question.choices.map((choice) => {
    const fontweightStyle = {
      fontWeight: choice === studentAnswer.answer ? "bold" : "lighter",
    };
    //const colorStyle = {color: choice === studentAnswer.answer? "green" : "red" }

    let colorStyle = "black";

    if (choice === studentAnswer.answer) {
      if (studentAnswer.correct) {
        colorStyle = "green";
      } else {
        colorStyle = "red";
      }
    }

    return (
      <li
        className={styles.li}
        key={choice}
        style={{ ...fontweightStyle, color: colorStyle }}
      >
        {choice}
      </li>
    );
  });

  return (
    <div>
      {questionTitle}
      <ul> {answerChoices} </ul>
    </div>
  );
}

// Set question component prop types
QuestionResult.propTypes = {
  question: QuestionShape,
  selectAnswer: PropTypes.func,
  studentAnswer: PropTypes.object,
};
