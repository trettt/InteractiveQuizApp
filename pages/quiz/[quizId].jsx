import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import QuestionForm from "@/components/questionForm";
import styles from "../../styles/Quiz.module.css";

export default function Quiz() {
  const router = useRouter();
  const { quizId } = router.query;

  const [numberOfQuestions, setNumberOfQuestions] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [quiz, setQuiz] = useState(null);
  const [firstQuestionId, setFirstQuestionId] = useState(null);

  useEffect(() => {
    async function fetchQuiz() {
      try {
        const res = await fetch("/api/quizzes");
        if (!res.ok) {
          throw new Error("Failed to fetch quizzes");
        }
        const data = await res.json();
        const currentQuiz = data.find((quiz) => quiz.id === parseInt(quizId));
        setQuiz(currentQuiz);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }

    if (quizId) {
      fetchQuiz();
    }
  }, [quizId]);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch("/api/questions");
        if (!res.ok) {
          throw new Error("Failed to fetch questions");
        }

        const data = await res.json();
        const quizQuestions = data.filter((q) => q.quizId === parseInt(quizId));
        setNumberOfQuestions(quizQuestions.length);
        setFirstQuestionId(
          quizQuestions.length > 0 ? quizQuestions[0].id : null
        );
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }

    if (quizId && quiz) {
      fetchQuestions();
    }
  }, [quizId, quiz]);

  if (loading) {
    return <p className={styles.message}>Loading questions...</p>;
  }

  if (error) {
    return <p className={styles.message}>Error: {error}</p>;
  }

  if (!quiz) {
    return <h1 className={styles.message}>Quiz not found</h1>;
  }

  const handleContributeClick = () => {
    setShowForm((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <u>
          <i>{quiz.title}</i>
        </u>
      </h1>
      <p className={styles.info}>
        This quiz contains <b>{numberOfQuestions}</b> questions.
      </p>
      <Link href={`/quiz/${quizId}/question/${firstQuestionId}`}>
        <button className={styles.button}>Start Quiz</button>
      </Link>
      <p> ... or </p>
      <p onClick={handleContributeClick} className={styles.contribute}>
        <u>{showForm ? "Hide Form" : "Contribute to the Quiz"}</u>
      </p>
      {showForm && (
        <QuestionForm
          quizId={quizId}
          numberOfQuestions={numberOfQuestions}
          setNumberOfQuestions={setNumberOfQuestions}
        />
      )}
    </div>
  );
}
