/*
Quiz Page
*/

//import Head from "next/head";
import styles from "../styles/index.module.css";
import Quiz from "../components/Quiz";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useUser } from "../contexts/UserContext";
import Header from "./header";

// import Header from "./header";

export default function QuizPage({
  data,
  learningGoals,
  setAttempt,
  quizQuestions,
  setQuizQuestions,
}) {
  const user = useUser();
  if (user) {
    console.log("User id is: ", user.uid);
  }

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
      <Header />

      <main>
        <h1 className={styles.text}>Progress Tracker</h1>
        <Quiz
          data={data}
          learningGoals={learningGoals}
          quizQuestions={quizQuestions}
          setQuizQuestions={setQuizQuestions}
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
  quizQuestions: PropTypes.arrayOf(PropTypes.object).isRequired,
  setQuizQuestions: PropTypes.func.isRequired,
  //attempt: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.any,
};
