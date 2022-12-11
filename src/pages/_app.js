/* eslint-disable  react/prop-types */
import { useState, useEffect } from "react";
// import { useEffect } from "react";

// import "../styles/globals.css";
import {
  addProfessor,
  addStudent,
  getAnswers,
  initializeFirebase,
} from "../utils/firebase-utils.mjs";
import UserContext from "../contexts/UserContext.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { initializeFirebase } from "../utils/firebase-utils.mjs";
// import { getAnswers } from "../utils/firebase-utils.mjs";

function MainApp({ Component, pageProps }) {
  initializeFirebase();
  // loadData();
  const [attempt, setAttempt] = useState([]);
  const [quizQuestions, setQuizQuestions] = useState([]);

  const [answers, setAnswers] = useState([]);
  const [newUser, setNewUser] = useState(false);
  const [instructor, setInstructor] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleburyId, setMiddleburyId] = useState("");

  const learningGoals = ["2", "3"];

  async function getData(questions, newSetAnswers) {
    console.log("questions", questions);
    const newAnswer = await getAnswers(questions);
    newSetAnswers(newAnswer);
    console.log("Answers in getData", newAnswer);
  }

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
        // router.push("/login");
      }
    });
    return unsubscribe;
  }, []);

  // Adds the user to the corresponding database, saves whether they are an instructor in the db
  const addUser = async () => {
    if (instructor) {
      await addProfessor(
        firstName,
        lastName,
        user.uid,
        middleburyId,
        instructor
      );
    } else {
      console.log("Main App: User id", user);
      await addStudent(firstName, lastName, user.uid, middleburyId, instructor);
    }
  };

  useEffect(() => {
    if (newUser) {
      addUser();
      setNewUser(false);
    }
  }, [user]);

  const props = {
    ...pageProps,
    learningGoals,
    attempt,
    setAttempt,
    quizQuestions,
    setQuizQuestions,
    answers,
    newUser,
    setNewUser,
    instructor,
    setInstructor,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    middleburyId,
    setMiddleburyId,
  };

  return (
    <UserContext.Provider value={user}>
      <Component {...props} />
    </UserContext.Provider>
  );
}

export default MainApp;
