/*
  QuestionShape.js

  This provides a PropTypes shape descriptor of question objects. This is pulled out
  since multiple components take question as props.
*/

import PropTypes from "prop-types";

const QuestionShape = PropTypes.shape({
  learningGoal: PropTypes.number.isRequired,
  question: PropTypes.string.isRequired,
  choices: PropTypes.arrayOf(PropTypes.string).isRequired,
});

export default QuestionShape;
