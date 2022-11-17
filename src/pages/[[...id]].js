import Head from "next/head";
import styles from "../styles/index.module.css";
import { Quiz } from "../components/Quiz";
import { useRouter } from "next/router";

export default function Main() {
  const router = useRouter();


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
          <h1 className={styles.text}>Progress Tracker</h1>
          <Quiz learningGoals={learningGoals} handleClick={handleClick} />
        </main>

        <footer className={styles.text}>A 312 project</footer>
      </div>   

  );
}
