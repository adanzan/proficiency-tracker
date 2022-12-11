/*
Learning Goals Page 
*/
import PropTypes from "prop-types";
import Head from "next/head";
import LearningGoals from "../components/LearningGoals";
//import Quiz from "../components/Quiz";

import { useRouter } from "next/router";

export default function LearningGoalsPage({ setLearningGoals }) {
  const router = useRouter();

  function onSubmit(lgArray) {
    const lgArrayCopy = [...lgArray];
    setLearningGoals(lgArrayCopy);
    router.push("/");
  }

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
          <LearningGoals onSubmit={onSubmit} />
        </fieldset>
      </div>
    </div>
  );
}

LearningGoalsPage.propTypes = {
  //learningGoals: PropTypes.arrayOf(PropTypes.string).isRequired,
  setLearningGoals: PropTypes.func.isRequired,
};
