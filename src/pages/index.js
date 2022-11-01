import Head from "next/head";
import styles from "../styles/index.module.css";
import { Quiz } from "../components/Quiz";

export default function Main() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Progress Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Progress Tracker</h1>
        <Quiz />
      </main>

      <footer>A 312 project</footer>
    </div>
  );
}
