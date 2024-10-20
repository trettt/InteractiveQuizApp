import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import QuestionForm from "@/components/questionForm";

const quizzes = [
  {
    id: 1,
    categoryId: 1,
    title: "Quiz 1",
  },
  {
    id: 2,
    categoryId: 1,
    title: "Quiz 2",
  },
  {
    id: 3,
    categoryId: 2,
    title: "Quiz 1",
  },
  {
    id: 4,
    categoryId: 2,
    title: "Quiz 2",
  },
];

export default function Quiz() {
  const router = useRouter();
  const { quizId } = router.query;
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const currentQuiz = quizzes.find((quiz) => quiz.id === parseInt(quizId));

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
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }

    if (quizId) {
      fetchQuestions();
    }
  }, [quizId]);

  if (!currentQuiz) {
    return <h1>Quiz not found</h1>;
  }

  if (loading) {
    return <p>Loading questions...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleContributeClick = () => {
    setShowForm((prev) => !prev);
  };

  return (
    <>
      <div>
        <h1>{currentQuiz.title}</h1>
        <p>This quiz contains {numberOfQuestions} questions.</p>
        <Link href={`/quiz/${quizId}/question/1`}>Start Quiz</Link>
      </div>
      <div>
        <button onClick={handleContributeClick}>
          {showForm ? "Hide Form" : "Contribute to the Quiz"}
        </button>
        {showForm && (
          <QuestionForm
            quizId={quizId}
            numberOfQuestions={numberOfQuestions}
            setNumberOfQuestions={setNumberOfQuestions}
          />
        )}
      </div>
    </>
  );
}
