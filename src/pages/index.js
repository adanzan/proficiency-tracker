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
  setQuizQuestions,
}) {
  const user = useUser();
  if (user) {
    console.log("User id is: ", user.uid);
  }

  const router = useRouter();

  // console.log(learningGoals);

  function handleClick() {
    router.push("/quizResults");
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
          submitQuiz={submitQuiz}
        />
      </main>

      <footer className={styles.text}>A 312 project</footer>
    </div>
  );
}

QuizPage.propTypes = {
  setAttempt: PropTypes.func.isRequired,
  learningGoals: PropTypes.arrayOf(PropTypes.number).isRequired,
  //attempt: PropTypes.arrayOf(PropTypes.object).isRequired,
  setQuizQuestions: PropTypes.func.isRequired,
  data: PropTypes.any,
};
