import Head from "next/head";
import styles from "../styles/index.module.css";
import { Quiz } from "../components/Quiz";
import { useRouter } from "next/router";

//import Question from "../components/Question";

// import styles from "../styles/index.module.css";

export default function Main() {
  const router = useRouter();
  // Testing
  /*
  const question = {
    learningGoal: 1,
    question: "What is a cat?",
    choices: ["Dog", "Elephant", "Turtle", "Cat"],
    answer: "Cat",
  };
  */

  const learningGoals = ["2", "4"];

  function handleClick() {
    router.push("/quizresults");
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Progress Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Progress Tracker</h1>
        <Quiz learningGoals={learningGoals} handleClick={handleClick} />
        {/* <p>This component is just a placeholder and should be replaced with your application</p> */}
      </main>

      <footer>A 312 project</footer>
    </div>
  );
}
