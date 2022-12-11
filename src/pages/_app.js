/* eslint-disable  react/prop-types */
import { useState } from "react";
import { useEffect } from "react";

import "../styles/globals.css";

import UserContext from "../contexts/UserContext.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeFirebase } from "../utils/firebase-utils.mjs";
import data from "../../data/Fake_Questions.json";
//import Fake_Questions from "../../data/Fake_Questions.json";

function MainApp({ Component, pageProps }) {
  initializeFirebase();
  const [attempt, setAttempt] = useState([]);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [learningGoals, setLearningGoals] = useState([]);
  const [user, setUser] = useState();

  console.log("main", learningGoals);

  // Sign the user in
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // Log the user in
        setUser(authUser);
      } else {
        setUser();
        // router.push("/login");
      }
    });
    return unsubscribe;
  }, []);

  const props = {
    ...pageProps,
    data,
    learningGoals,
    setLearningGoals,
    attempt,
    setAttempt,
    quizQuestions,
    setQuizQuestions,
  };

  return (
    <UserContext.Provider value={user}>
      <Component {...props} />
    </UserContext.Provider>
  );
}

export default MainApp;
