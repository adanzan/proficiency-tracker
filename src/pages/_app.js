/* eslint-disable  react/prop-types */
import { useState } from "react";
import { useEffect } from "react";

import "../styles/globals.css";

import UserContext from "../contexts/UserContext.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
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
  const learningGoals = ["2", "3"];
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    getData(quizQuestions, setAnswers);
  }, [quizQuestions]);

  const [user, setUser] = useState();

  // Sign the user in
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // Log the user in
        setUser(authUser);
      } else {
        setUser();
      }
    });
    return unsubscribe;
  }, []);

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

  return (
    <UserContext.Provider value={user}>
      <Component {...props} />
    </UserContext.Provider>
  );
}

export default MainApp;
