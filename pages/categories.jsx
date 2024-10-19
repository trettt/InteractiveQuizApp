import Link from "next/link";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Container,
  Button,
} from "@mui/material";

const categories = [
  {
    id: "1",
    name: "General Knowledge",
  },
  {
    id: "2",
    name: "Science",
  },
  {
    id: "3",
    name: "Sports",
  },
  {
    id: "4",
    name: "Music",
  },
];

export default function Categories() {
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
