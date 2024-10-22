import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../styles/Categories.module.css";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories");
        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await res.json();
        setCategories(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }

    fetchCategories();
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
      <h1 className={styles.title}>
        <i>Choose a Category</i>
      </h1>
      <div className={styles.grid}>
        {categories.map((category) => (
          <Link href={`/quizzes/${category.id}`} key={category.id}>
            <div className={styles.card}>
              <h3>{category.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
