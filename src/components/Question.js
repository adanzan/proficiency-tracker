/*
  Question.js

  The Question displays the contents of a quiz question. 

  props:
    question - the question to render (required) with properties learningGoal, question, choices, and answer
    setCurrentAnswer - callback function to set the current answer of which answer option has been selected 
*/

import PropTypes from "prop-types";
import QuestionShape from "./QuestionShape";
// import { useState } from "react";

export default function Question({ question, selectAnswer }) {
  // Display the question title
  const questionTitle = <div> {question.question} </div>;

  // Display answer choices
  const answerChoices = question.choices.map((choice) => {
    return (
      <li key={choice} id="choice" onClick={() => selectAnswer(choice)}>
        {choice}
      </li>
    );
  });

  console.log(selectAnswer);

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
