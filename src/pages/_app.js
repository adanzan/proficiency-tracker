/* eslint-disable  react/prop-types */
import { useState } from "react";
import { useEffect } from "react";

import "../styles/globals.css";

import { useRouter } from "next/router";
import UserContext from "../contexts/UserContext.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeFirebase } from "../utils/firebase-utils.mjs";
import data from "../../data/Fake_Questions.json";
//import Fake_Questions from "../../data/Fake_Questions.json";

function MainApp({ Component, pageProps }) {
  initializeFirebase();
  const [attempt, setAttempt] = useState([]);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const learningGoals = ["1", "5"];

  const [user, setUser] = useState();

  const router = useRouter();

  // Sign the user in
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // Log the user in
        setUser(authUser);
      } else {
        router.push("/login");
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
  };

  return (
    <UserContext.Provider value={user}>
      <Component {...props} />
    </UserContext.Provider>
  );
}

export default MainApp;
