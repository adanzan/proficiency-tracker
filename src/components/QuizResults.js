/*
Quiz Results page
*/

import Correct_Answers from "../../data/Correct_Answers.json";

export default function QuizResults() {
  const selectedAnswers = [
    { qID: 2, answer: "20-22 years" },
    { qID: 3, answer: "Siamese" },
    { qID: 1, answer: "cat" },
  ];
  const selectedAnswerCorrect = [];

  selectedAnswers.forEach((selectedAnswer) => {
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

  console.log(selectedAnswerCorrect);

  return (
    <div>
      <h2>Quiz 1 Results</h2>
      {/*will need to implement some way to calcuale score (in Quiz?)*/}
      <h3>100%</h3>

      <button type="button">Return to Learning Goals</button>
    </div>
  );
}
