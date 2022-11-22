/*
Quiz Page
*/

import Head from "next/head";
import styles from "../styles/index.module.css";
import { Quiz } from "../components/Quiz";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

export default function QuizPage({ setAttempt, attempt }) {
  const router = useRouter();
  const learningGoals = ["2", "4"];

  function handleClick() {
    router.push("/quizresults");
  }

  /*
  // Map on each question to fill out the empty array
  const attemptArray = [];
  data.map((q) => {
    attemptArray.push({ id: q.qID, answer: "" });
  });
  */

  function submitQuiz(attemptArray) {
    const attemptArrayCopy = [...attemptArray];
    setAttempt(attemptArrayCopy);
    handleClick();
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Progress Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.text}>Progress Tracker</h1>
        <Quiz
          learningGoals={learningGoals}
          attempt={attempt}
          submitQuiz={submitQuiz}
        />
      </main>

      <footer className={styles.text}>A 312 project</footer>
    </div>
  );
}

QuizPage.propTypes = {
  setAttempt: PropTypes.func.isRequired,
  attempt: PropTypes.arrayOf(PropTypes.object).isRequired,
};
