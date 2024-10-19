import Head from "next/head";
import Link from "next/link";
import { Container, Typography, Box, Button } from "@mui/material";

export default function Home() {
  return (
    <>
      <Head>
        <title>Best Quiz App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/quiz.png" />
      </Head>
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#f5f5f5",
            padding: "40px",
            borderRadius: "12px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "#3f51b5",
              mb: 3,
            }}
          >
            Welcome to the Quiz of Quizzes!
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: "1.2rem",
              color: "#333",
              marginBottom: "30px",
            }}
          >
            Think you know everything? Well, it’s time to prove it! But hey, no
            pressure... Ready to begin?
          </Typography>
          <Link href="/categories" passHref>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >
              Start Quiz
            </Button>
          </Link>
        </Box>
      </Container>
    </>
  );
}
