/*
Learning Goals Component 
*/
import PropTypes from "prop-types";
import { getLearningGoals } from "../utils/firebase-utils.mjs";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";

export default function LearningGoals({ onSubmit }) {
  const [selectedGoal, selectGoal] = useState([]);
  const [learningGoalArr, setLearningGoalArr] = useState([]);

  useEffect(() => {
    async function fetchLearningGoals() {
      const learningGoals = await getLearningGoals();
      // Set state of learning goal data
      setLearningGoalArr(learningGoals);
    }
    fetchLearningGoals();
  }, []);

  function handleSelect(learningGoal) {
    // if learning goal doesn't exist, add to selectedGoal state
    if (![...selectedGoal].includes(learningGoal)) {
      // learning goal not already included, add to state
      selectGoal([...selectedGoal, learningGoal]);
    } else {
      // Already in our state array, remove it from selectedGoal arr
      selectGoal(selectedGoal.filter((goal) => goal !== learningGoal));
    }
  }

  const displayLearningGoals = learningGoalArr.map((lg) => {
    return (
      <div key={lg}>
        <input
          type="checkbox"
          id={lg}
          name="learningGoal"
          value={lg}
          onChange={() => handleSelect(lg)}
        />
        <label htmlFor={lg}>{lg}</label>
      </div>
    );
  });

  // const submitLg = setLearningGoals(selectedGoal);
  // const submitLg = useEffect(() =>
  //   setLearningGoals(selectedGoal)
  //  );

  return (
    <div>
      <div>{displayLearningGoals}</div>
      <div>
        <Button
          variant="outline-dark"
          disabled={selectedGoal.length === 0}
          onClick={() => onSubmit(selectedGoal)}
        >
          Begin Quiz
        </Button>
      </div>
    </div>
  );
}

LearningGoals.propTypes = {
  //learningGoals: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSubmit: PropTypes.func.isRequired,
  //setLearningGoals: PropTypes.func.isRequired,
};
