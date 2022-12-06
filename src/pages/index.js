/*
Quiz Page
*/

import Head from "next/head";
import styles from "../styles/index.module.css";
import { Quiz } from "../components/Quiz";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
//import { propTypes } from "react-bootstrap/esm/Image";

export default function QuizPage({
  data,
  learningGoals,
  setAttempt,
  setQuizQuestions,
}) {
  const router = useRouter();

  function handleClick() {
    router.push("/quizresults");
  }

  function submitQuiz(attemptArray, quizQuestionsArray) {
    const attemptArrayCopy = [...attemptArray];
    setAttempt(attemptArrayCopy);
    setQuizQuestions(quizQuestionsArray);
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
          data={data}
          learningGoals={learningGoals}
          submitQuiz={submitQuiz}
        />
      </main>

      <footer className={styles.text}>A 312 project</footer>
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
