/*
  QuestionResult.js

  Displays a student attempt on a quiz

  props:
    question - the question to render (required) with properties learningGoal, question and choices
    studentAnswer - the answer selected by the student and whether it is correct
*/

import PropTypes from "prop-types";
import QuestionShape from "./QuestionShape";

import styles from "../styles/QuestionResult.module.css";

export default function QuestionResult({ question, studentAnswer }) {
  const questionTitle = <div> {question.question} </div>;

  // Formats the choices based on the student answer
  const answerChoices = question.choices.map((choice) => {
    const fontWeightStyle =
      choice === studentAnswer.answer ? "bold" : "lighter";

    let colorStyle = "black";
    if (choice === studentAnswer.answer) {
      colorStyle = studentAnswer.correct ? "green" : "red";
    }

    return (
      <li
        className={styles.li}
        key={choice}
        style={{ fontWeight: fontWeightStyle, color: colorStyle }}
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

QuestionResult.propTypes = {
  question: QuestionShape,
  studentAnswer: PropTypes.object.isRequired,
};
