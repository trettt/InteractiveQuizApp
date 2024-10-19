import Link from "next/link";

export default function ScoreBoard({ score, numberOfQuestions }) {
  return (
    <div>
      <h1>Quiz Completed!</h1>
      <p>
        You scored {score} out of {numberOfQuestions}.
      </p>
      <Link href="/categories">Back to Categories</Link>
    </div>
  );
}
