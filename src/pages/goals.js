/*
Learning Goals Page 
*/
import PropTypes from "prop-types";
import Head from "next/head";
import LearningGoals from "../components/LearningGoals";
//import Quiz from "../components/Quiz";

export default function LearningGoalsPage({ setLearningGoals }) {
  return (
    <div>
      <Head>
        <title>Learning Goals</title>
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

LearningGoalsPage.propTypes = {
  //learningGoals: PropTypes.arrayOf(PropTypes.string).isRequired,
  setLearningGoals: PropTypes.func.isRequired,
};
