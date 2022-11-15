/*
Quiz Results page
*/

import Correct_Answers from "../../data/Correct_Answers.json";
import QuestionResult from "./QuestionResult";
import styles from "../styles/Quiz.module.css";

export default function QuizResults() {
  // The answers submitted by the student
  const studentAnswers = [
    { qID: 2, answer: "20-22 years" },
    { qID: 3, answer: "Siamese" },
    { qID: 1, answer: "Cat" },
  ];

  // Questions from the question bank
  const questions = [
    {
      qID: 2,
      learningGoal: 1,
      question: "What is a typical lifespan of a cat?",
      choices: ["12-18 years", "20-22 years", "0-4 years", "6-12 years"],
    },
    {
      qID: 3,
      learningGoal: 1,
      question: "Which is NOT a breed of cat?",
      choices: ["Siamese", "British Shorthair", "Persian", "Poodle"],
    },
    {
      qID: 1,
      learningGoal: 1,
      question: "What is a cat?",
      choices: ["Dog", "Elephant", "Turtle", "Cat"],
    },
  ];

  // Evaluates the answers
  const selectedAnswerCorrect = [];
  studentAnswers.forEach((selectedAnswer) => {
    if (Correct_Answers.includes(selectedAnswer)) {
      selectedAnswerCorrect.push({
        qID: selectedAnswer.qID,
        answer: selectedAnswer.answer,
        correct: true,
      });
    } else {
      selectedAnswerCorrect.push({
        qID: selectedAnswer.qID,
        answer: selectedAnswer.answer,
        correct: false,
      });
    }
  });

  console.log("hi", selectedAnswerCorrect);

  const displayQuestionResults = questions.map((q, index) => {
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
      {/*will need to implement some way to calculate score (in Quiz?)*/}
      {displayQuestionResults}
      <button type="button">View Learning Goal Progress</button>
    </div>
  );
}
