import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../../styles/CategoriesQuizzes.module.css";

export default function Quizzes() {
  const router = useRouter();
  const { categoryId } = router.query;

  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchQuizzes() {
      try {
        const res = await fetch("/api/quizzes");
        if (!res.ok) {
          throw new Error("Failed to fetch quizzes");
        }
        const data = await res.json();
        const currentQuizzes = data.filter(
          (quiz) => quiz.categoryId == Number(categoryId)
        );
        setQuizzes(currentQuizzes);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }

    fetchQuizzes();
  }, []);

  if (loading)
    return (
      <div className={styles.message}>
        <p>Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className={styles.message}>
        <p>Error: {error.message}</p>
      </div>
    );

  return (
    <div className={styles.container}>
      {quizzes.length > 0 ? (
        <div>
          <h1 className={styles.title}>
            <i>Available Quizzes</i>
          </h1>
          <div className={styles.quizList}>
            {quizzes.map((quiz) => (
              <Link href={`/quiz/${quiz.id}`} key={quiz.id}>
                <div className={styles.card}>
                  <h3>{quiz.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.message}>
          <h3>No quizzes available for this category :(</h3>
        </div>
      )}
    </div>
  );
}
