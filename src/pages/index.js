/*
Quiz Page
*/

//import Head from "next/head";
import styles from "../styles/index.module.css";
import { Quiz } from "../components/Quiz";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useUser } from "../contexts/UserContext";
import Header from "./header";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { getFirestore, doc, getDoc } from "firebase/firestore";
// import Header from "./header";

export default function QuizPage({ setAttempt, attempt, setQuizQuestions }) {
  const user = useUser();
  const userInfo = useCurrentUser();

  const db = getFirestore();

  async function getDummy() {
    const dummyInfo = await getDoc(
      doc(db, "professors", "tHDSFdv34KRpIuvTr2k5aj9auKH3")
    );
    return dummyInfo.data();
  }

  if (user) {
    console.log("User id is: ", user.uid);
    console.log("User info is: ", userInfo);
    let newInfo;
    getDummy().then((result) => {
      newInfo = result;
    });
    console.log(newinfo);
    console.log("Dummy info is: ", newInfo);

    // console.log("User first name is:", studentInfo.first);
  }

  const router = useRouter();
  const learningGoals = ["2", "4"];

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
  setQuizQuestions: PropTypes.func.isRequired,
};
