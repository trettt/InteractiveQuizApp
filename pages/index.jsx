import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Best Quiz App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/quiz.png" />
      </Head>
      <div className={styles.box}>
        <h1>Welcome to the Quiz of Quizzes!</h1>
        <p>
          Think you know everything? Well, it’s time to prove it! But hey, no
          pressure... Ready to begin?
        </p>
        <Link href="/categories" passHref>
          <button className={styles.button}>Start Quiz</button>
        </Link>
      </div>
    </div>
  );
}
