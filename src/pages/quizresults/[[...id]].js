/*
Quiz Results page

*/
import PropTypes from "prop-types";
import QuizResults from "../../components/QuizResults";

export default function QuizResultsPage({ attempt }) {
  return (
    <div>
      <QuizResults attempt={attempt} />
    </div>
  );
}

QuizResultsPage.propTypes = {
  attempt: PropTypes.arrayOf(PropTypes.object).isRequired,
};
