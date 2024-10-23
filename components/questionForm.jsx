import { TextField, Button, Box, Typography } from "@mui/material";

export default function QuestionForm({
  quizId,
  numberOfQuestions,
  setNumberOfQuestions,
}) {
  function getInfo() {
    const question = document.querySelector("textarea").value;
    const answerFields = document.querySelectorAll("#answer");
    const answers = Array.from(answerFields).map((input) => input.value);
    const correctAnswer = document.querySelector("#correctAnswer").value;

    if (
      !question ||
      answers.some((answer) => answer === "") ||
      !correctAnswer
    ) {
      alert("Please fill out all fields.");
      return;
    }

    if (new Set(answers).size !== answers.length) {
      alert("Answers must be unique.");
      return;
    }

    const correctAnswerPosition = answers.findIndex(
      (answer) => answer.toLowerCase() === correctAnswer.toLowerCase()
    );

    if (correctAnswerPosition === -1) {
      alert("Correct answer must match one of the provided answers.");
      return null;
    }

    const uniqueId = crypto.randomUUID();

    return {
      id: uniqueId,
      quizId: Number(quizId),
      question: question,
      answers: answers,
      correctAnswerPosition: correctAnswerPosition,
    };
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const info = getInfo();
    if (!info) return;

    setNumberOfQuestions(numberOfQuestions + 1);

    const res = await fetch("/api/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });

    if (!res.ok) {
      console.log("Failed to save question");
    } else {
      console.log("Question saved");
      resetForm();
    }
  }

  function resetForm() {
    document.querySelector("textarea").value = "";
    document.querySelectorAll("#answer").forEach((input) => (input.value = ""));
    document.querySelector("#correctAnswer").value = "";
  }

  return (
    <Box
      sx={{
        maxWidth: "400px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Quiz Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Question"
          multiline
          rows={3}
          placeholder="Enter the question"
          margin="normal"
        />
        <TextField
          id="answer"
          fullWidth
          label="Answer 1"
          placeholder="Enter Answer 1"
          margin="normal"
        />
        <TextField
          id="answer"
          fullWidth
          label="Answer 2"
          placeholder="Enter Answer 2"
          margin="normal"
        />
        <TextField
          id="answer"
          fullWidth
          label="Answer 3"
          placeholder="Enter Answer 3"
          margin="normal"
        />
        <TextField
          id="answer"
          fullWidth
          label="Answer 4"
          placeholder="Enter Answer 4"
          margin="normal"
        />
        <TextField
          id="correctAnswer"
          fullWidth
          label="Correct Answer"
          placeholder="Enter the correct answer"
          margin="normal"
        />
        <Box textAlign="center" marginTop={3}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
}
