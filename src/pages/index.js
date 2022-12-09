/*
Learning Goals Page 
*/
import Head from "next/head";
import LearningGoals from "../components/LearningGoals";

export default function learningGoalsPage() {
  //const learningGoalsArray = ["1", "2", "3", "4", "5"]

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
          <LearningGoals
          //learningGoalsArray={learningGoalsArray}
          />
        </fieldset>
      </div>
    </div>
  );
}
