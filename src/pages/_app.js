/* eslint-disable  react/prop-types */
import { useState } from "react";
import "../styles/globals.css";
import { initializeFirebase } from "../utils/firebase-utils.mjs";
import data from "../../data/Fake_Questions.json";
//import Fake_Questions from "../../data/Fake_Questions.json";

import { getAnswers } from "../utils/firebase-utils.mjs";
import { useEffect } from "react";

async function getData(questions, setAnswers){
  console.log("questions", questions)
  const answers = await getAnswers(questions);
  setAnswers(answers);
  console.log("Answers in getData",answers);
}

function MainApp({ Component, pageProps }) {
  initializeFirebase();
  // loadData();
  const [attempt, setAttempt] = useState([]);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const learningGoals = ["1", "5"];
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    getData(quizQuestions, setAnswers);
  }, [quizQuestions]);

  const props = {
    ...pageProps,
    data,
    learningGoals,
    attempt,
    setAttempt,
    quizQuestions,
    setQuizQuestions,
    answers,
  };
  return <Component {...props} />;
}

export default MainApp;
