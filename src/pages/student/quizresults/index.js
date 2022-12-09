/*
Quiz Results page

*/
import PropTypes from "prop-types";
import QuizResults from "../../../components/QuizResults";

export default function QuizResultsPage({ attempt, quizQuestions }) {
  return (
    <div>
      <QuizResults attempt={attempt} quizQuestions={quizQuestions} />
    </div>
  );
}

QuizResultsPage.propTypes = {
  attempt: PropTypes.arrayOf(PropTypes.object).isRequired,
  quizQuestions: PropTypes.arrayOf(PropTypes.object).isRequired,
};
