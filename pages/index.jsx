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
        <h1 className={styles.title}>
          <u>Welcome to the Quiz of Quizzes!</u>
        </h1>
        <p className={styles.description}>
          Think you know everything? Well, it’s time to prove it! But hey, no
          pressure...
        </p>
        <Link href="/categories">
          <button className={styles.button}>Ready to begin?</button>
        </Link>
      </div>
    </div>
  );
}
