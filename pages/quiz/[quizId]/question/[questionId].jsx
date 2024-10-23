import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../../../styles/Question.module.css";
import { useState } from "react";
import { useEffect } from "react";
import ScoreBoard from "@/components/scoreBoard";

export default function Question() {
  const router = useRouter();
  const { quizId, questionId } = router.query;

  const [questionAnswered, setQuestionAnswered] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch("/api/questions");
        if (!res.ok) {
          throw new Error("Failed to fetch questions");
        }
        const data = await res.json();
        setQuestions(data.filter((q) => q.quizId === parseInt(quizId)));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }

    fetchQuestions();
  }, []);

  useEffect(() => {
    setQuestionAnswered(false);
    setSelectedAnswerIndex(null);
    setIsCorrect(false);
  }, [questionId]);

  const currentQuestion = questions.find((q) => q.id === questionId);
  const numberOfQuestions = questions.length;
  const currentIndex = questions.findIndex((q) => q.id === questionId);

  function checkAnswer() {
    const selectedAnswer = document.querySelector("input[name=answer]:checked");
    if (selectedAnswer) {
      const selectedAnswerText = selectedAnswer.nextSibling.textContent.trim();
      const correctAnswerText =
        currentQuestion.answers[currentQuestion.correctAnswerPosition];

      if (selectedAnswerText === correctAnswerText) {
        setIsCorrect(true);
        setScore(score + 1);
      }
      setQuestionAnswered(true);
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.container}>
      <div>Score: {score}</div>
      <h1 className={styles.questionTitle}>{currentQuestion.question}</h1>
      <ul className={styles.answerList}>
        {currentQuestion.answers.map((answer, index) => (
          <li key={index} className={styles.answerItem}>
            <input
              disabled={questionAnswered}
              onClick={checkAnswer}
              type="radio"
              id={`answer-${index}`}
              name="answer"
              className={styles.answerButton}
              checked={selectedAnswerIndex === index}
              onChange={() => setSelectedAnswerIndex(index)}
            />
            <label htmlFor={`answer-${index}`} className={styles.answerLabel}>
              {answer}
            </label>
          </li>
        ))}
      </ul>
      {questionAnswered && (
        <div>
          <p>
            {isCorrect
              ? "Corect"
              : `Gresit! Raspunsul corect este ${
                  currentQuestion.answers[
                    Number(currentQuestion.correctAnswerPosition)
                  ]
                }`}
          </p>

          {Number(numberOfQuestions) !== currentIndex + 1 ? (
            <Link
              href={`/quiz/${quizId}/question/${
                questions[currentIndex + 1].id
              }`}
            >
              Next
            </Link>
          ) : (
            <ScoreBoard score={score} numberOfQuestions={numberOfQuestions} />
          )}
        </div>
      )}
    </div>
  );
}
