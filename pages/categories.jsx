import Link from "next/link";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Container,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Container maxWidth="sm" sx={{ marginTop: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Choose a Category
      </Typography>
      <List>
        {categories.map((category) => (
          <ListItem button key={category.id} sx={{ marginBottom: 2 }}>
            <Link
              href={`/quizzes/${category.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Button fullWidth variant="contained" color="primary">
                <ListItemText primary={category.name} />
              </Button>
            </Link>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
