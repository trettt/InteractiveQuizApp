import { useRouter } from "next/router";
import Link from "next/link";
import {
  Container,
  Typography,
  List,
  ListItem,
  Button,
  Box,
} from "@mui/material";

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

export default function Quizzes() {
  const router = useRouter();
  const { categoryId } = router.query;

  const filteredQuizzes = quizzes.filter(
    (quiz) => quiz.categoryId == Number(categoryId)
  );

  return (
    <Container
      maxWidth="sm"
      sx={{
        paddingTop: "50px",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Choose a Quiz
      </Typography>
      {filteredQuizzes.length > 0 ? (
        <List sx={{ marginTop: "20px" }}>
          {filteredQuizzes.map((quiz) => (
            <ListItem key={quiz.id} sx={{ justifyContent: "center" }}>
              <Link href={`/quiz/${quiz.id}`} passHref>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    width: "100%",
                    textTransform: "none",
                    fontWeight: "bold",
                  }}
                >
                  {quiz.title}
                </Button>
              </Link>
            </ListItem>
          ))}
        </List>
      ) : (
        <Box mt={4}>
          <Typography variant="body1" color="textSecondary">
            No quizzes available for this category.
          </Typography>
        </Box>
      )}
    </Container>
  );
}
