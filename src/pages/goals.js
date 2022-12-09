/*
Learning Goals Page 
*/
import PropTypes from "prop-types";
import Head from "next/head";
import LearningGoals from "../components/LearningGoals";
//import Quiz from "../components/Quiz";

export default function learningGoalsPage({ setLearningGoals }) {
  return (
    <div>
      <Head>
        <div>
          <title>Learning Goals</title>
        </div>
      </Head>

      <div>
        <h1>Quiz Learnings for Quiz</h1>
      </div>

      <div>
        <fieldset>
          <legend>Select Learning Goals</legend>
          <LearningGoals setLearningGoals={setLearningGoals} />
        </fieldset>
      </div>
    </div>
  );
}

learningGoalsPage.propTypes = {
  //learningGoalsArray: PropTypes.arrayOf(PropTypes.string).isRequired,
  setLearningGoals: PropTypes.func.isRequired,
};
