import styles from "../styles/QuestionForm.module.css";

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
    <div className={styles.container}>
      <h2 className={styles.title}>Quiz Form</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <textarea
          className={styles.textarea}
          placeholder="Enter the question"
          rows={2}
        />
        <input
          id="answer"
          className={styles.input}
          placeholder="option"
        />
        <input
          id="answer"
          className={styles.input}
          placeholder="option"
        />
        <input
          id="answer"
          className={styles.input}
          placeholder="option"
        />
        <input
          id="answer"
          className={styles.input}
          placeholder="option"
        />
        <input
          id="correctAnswer"
          className={styles.input}
          placeholder="correct answer"
        />
        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
}
