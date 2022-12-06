/* eslint-disable  react/prop-types */
import { useState } from "react";
import "../styles/globals.css";
import { initializeFirebase } from "../utils/firebase-utils.mjs";
import data from "../../data/Fake_Questions.json";
//import Fake_Questions from "../../data/Fake_Questions.json";

function MainApp({ Component, pageProps }) {
  initializeFirebase();
  const [attempt, setAttempt] = useState([]);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const learningGoals = ["1", "5"];

  const props = {
    ...pageProps,
    data,
    learningGoals,
    attempt,
    setAttempt,
    quizQuestions,
    setQuizQuestions,
  };
  return <Component {...props} />;
}

export default MainApp;
