/*
Quiz Results page
*/

import PropTypes from "prop-types";
// import Correct_Answers from "../../data/Correct_Answers.json";
import QuestionResult from "./QuestionResult";
import styles from "../styles/Quiz.module.css";
//import { updateStudentResults } from "../utils/firebase-utils.mjs";
//import { useEffect } from "react";
//import { useUser } from "../contexts/UserContext";

// async function updateData(lGoal, middId, score, answers) {
//   await updateStudentResults(lGoal, middId, score, answers);
// }

export default function QuizResults({ attempt, quizQuestions, answers }) {
  // console.log("Quiz questions", quizQuestions);
  // console.log("Answers are: ", answers);

  const correctAnswersCopy = [...answers];
  // Changes the array of correctAnswers so that they have the same ordering as questions
  const correctAnswers = [];
  const lGoals = [];

  quizQuestions.forEach((question) => {
    const answer = correctAnswersCopy.find((ans) => ans.qID === question.qID);
    correctAnswers.push(answer);
    if (!lGoals.includes(question.learningGoal)) {
      lGoals.push(question.learningGoal);
    }
  });

  // Evaluates the answers
  // let score = 0;
  const selectedAnswerCorrect = [];
  for (let i = 0; i < answers.length; i++) {
    const selectedAnswer = attempt[i];
    selectedAnswerCorrect.push({
      qID: selectedAnswer.id,
      answer: selectedAnswer.answer,
      correct: selectedAnswer.answer === correctAnswers[i].answer,
    });
    // if (selectedAnswer.answer === correctAnswers[i].answer) {
    //   score++;
    // }
  }

  //const user = useUser();

  //The user is temporarily hardcoded because I don't have the authentication files
  // useEffect(() => {
  //   updateData(lGoals, user.id, score, selectedAnswerCorrect);
  // }, []);

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
  answers: PropTypes.array.isRequired,
  attempt: PropTypes.arrayOf(PropTypes.object),
  quizQuestions: PropTypes.arrayOf(PropTypes.object).isRequired,
};
