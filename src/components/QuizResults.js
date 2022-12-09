/*
Quiz Results page
*/

import PropTypes from "prop-types";
// import Correct_Answers from "../../data/Correct_Answers.json";
import QuestionResult from "./QuestionResult";
import styles from "../styles/Quiz.module.css";
import { getAnswers } from "../utils/firebase-utils.mjs";
import { useState, useEffect } from "react";

async function getData(questions, callback){
  const answers = await getAnswers(questions);
  callback(answers);
}

export default function QuizResults({ attempt, quizQuestions }) {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    getData(quizQuestions, setAnswers);
  }, []);

  const correctAnswersCopy = [...answers];
  // Changes the array of correctAnswers so that they have the same ordering as questions
  const correctAnswers = [];
  quizQuestions.forEach((question, index) => {
    const answer = correctAnswersCopy.find(
      (ans) => ans.qID === quizQuestions[index].qID
    );
    correctAnswers.push(answer);
  });

  // Evaluates the answers
  const selectedAnswerCorrect = [];
  attempt.forEach((selectedAnswer, index) => {
    selectedAnswerCorrect.push({
      qID: selectedAnswer.id,
      answer: selectedAnswer.answer,
      correct: selectedAnswer.answer === correctAnswers[index].answer,
    });
  });

  // Creates a questionResult object from the student answers
  const displayQuestionResults = quizQuestions.map((q, index) => {
    return (
      <div key={q.question}>
        <QuestionResult
          question={q}
          studentAnswer={selectedAnswerCorrect[index]}
        />
      </div>
    );
  });

  return (
    <div className={styles.round}>
      <h2>Quiz 1 Results</h2>
      {displayQuestionResults}
      <button type="button">View Learning Goal Progress</button>
    </div>
  );
}

QuizResults.propTypes = {
  attempt: PropTypes.arrayOf(PropTypes.object),
  quizQuestions: PropTypes.arrayOf(PropTypes.object).isRequired,
};
