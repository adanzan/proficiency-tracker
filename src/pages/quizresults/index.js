/*
Quiz Results page

*/
import PropTypes from "prop-types";
import QuizResults from "../../components/QuizResults";

export default function QuizResultsPage({ attempt, quizQuestions, answers }) {
  return (
    <div>
      <QuizResults attempt={attempt} quizQuestions={quizQuestions} answers={answers}/>
    </div>
  );
}

QuizResultsPage.propTypes = {
  answers: PropTypes.array.isRequired,
  attempt: PropTypes.arrayOf(PropTypes.object).isRequired,
  quizQuestions: PropTypes.arrayOf(PropTypes.object).isRequired,
};
