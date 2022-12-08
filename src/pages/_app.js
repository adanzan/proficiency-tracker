/* eslint-disable  react/prop-types */
import { useState } from "react";
import { useEffect } from "react";

import "../styles/globals.css";

import UserContext from "../contexts/UserContext.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeFirebase } from "../utils/firebase-utils.mjs";

function MainApp({ Component, pageProps }) {
  initializeFirebase();
  const [attempt, setAttempt] = useState([]);
  const [quizQuestions, setQuizQuestions] = useState([]);

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
