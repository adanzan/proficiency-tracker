/*
Quiz Results page
*/

import PropTypes from "prop-types";
// import Correct_Answers from "../../data/Correct_Answers.json";
import QuestionResult from "./QuestionResult";
import styles from "../styles/Quiz.module.css";
import {updateStudentResults} from "../utils/firebase-utils.mjs"

// async function uploadData(learningGoals, studentId, "3", "10", []){
//   await updateStudentResults(learningGoals, studentId, "3", "10", []);
// }
export default function QuizResults({ attempt, quizQuestions, answers }) {
  console.log("Quiz questions", quizQuestions);
  console.log("Answers are: ", answers);

  const correctAnswersCopy = [...answers];
  // Changes the array of correctAnswers so that they have the same ordering as questions
  const correctAnswers = [];

  quizQuestions.forEach((question) => {
    const answer = correctAnswersCopy.find((ans) => ans.qID === question.qID);
    correctAnswers.push(answer);
  })


  // Evaluates the answers
  const selectedAnswerCorrect = [];
  for(let i=0; i<attempt.length; i++){
    const selectedAnswer = attempt[i];
    selectedAnswerCorrect.push({
      qID: selectedAnswer.id,
      answer: selectedAnswer.answer,
      correct: selectedAnswer.answer === correctAnswers[i].answer,
    })
  }

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
  answers: PropTypes.array. isRequired,
  attempt: PropTypes.arrayOf(PropTypes.object),
  quizQuestions: PropTypes.arrayOf(PropTypes.object).isRequired,
};
