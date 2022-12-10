/*
Quiz Page
*/

//import Head from "next/head";
import styles from "../styles/index.module.css";
import Quiz from "../components/Quiz";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useUser } from "../contexts/UserContext";
// import Header from "./header";
// import { getAuth } from "firebase/auth";
import UserHeader from "../components/UserHeader";

import Link from "next/link";
import useCurrentStudent from "../hooks/useCurrentStudent";
// import { getFirestore, doc, getDoc } from "firebase/firestore";

export default function QuizPage({
  data,
  learningGoals,
  setAttempt,
  setQuizQuestions,
}) {
  const user = useUser();
  const router = useRouter();

  const studentInfo = useCurrentStudent(user && user.uid);
  console.log(studentInfo);

  if (user) {
    // const studentInfo = useCurrentStudent(user.uid);
    // console.log("Student info is: ", studentInfo);
    console.log("User id is: ", user.uid);
    // console.log("User info is: ", userInfo);
  }

  function handleClick() {
    router.push("/quizresults");
  }

  function submitQuiz(attemptArray, quizQuestionsArray) {
    const attemptArrayCopy = [...attemptArray];
    setAttempt(attemptArrayCopy);
    setQuizQuestions(quizQuestionsArray);
    handleClick();
  }

  const isStudent = true; // Grab the user's identification if they are a student or instructor

  return user ? (
    <div className={styles.container}>
      <UserHeader isStudent={isStudent} />
      <main>
        <h1 className={styles.text}>Progress Tracker</h1>
        <Quiz
          data={data}
          learningGoals={learningGoals}
          submitQuiz={submitQuiz}
        />
      </main>

      <footer className={styles.text}>A 312 project</footer>
    </div>
  ) : (
    <div className={styles.content}>
      <Link href="/login">Log in</Link>
    </div>
  );
}

QuizPage.propTypes = {
  setAttempt: PropTypes.func.isRequired,
  learningGoals: PropTypes.arrayOf(PropTypes.string).isRequired,
  //attempt: PropTypes.arrayOf(PropTypes.object).isRequired,
  setQuizQuestions: PropTypes.func.isRequired,
  data: PropTypes.any,
};
