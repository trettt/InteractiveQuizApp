import { promises as fs } from "fs";
import path from "path";

export default async function handler(req, res) {
  const filePath = path.join(process.cwd(), "data", "questions.json");

  if (req.method === "GET") {
    try {
      const fileContents = await fs.readFile(filePath, "utf-8");
      const questions = JSON.parse(fileContents);
      res.status(200).json(questions);
    } catch (error) {
      res.status(500).json({ error: "Failed to load questions" });
    }
  } else if (req.method === "POST") {
    try {
      const filePath = path.join(process.cwd(), "data", "questions.json");
      const fileContents = await fs.readFile(filePath, "utf-8");
      const questions = JSON.parse(fileContents);

      const newQuestion = req.body;
      questions.push(newQuestion);

      await fs.writeFile(filePath, JSON.stringify(questions, null, 2));

      res.status(201).json(newQuestion);
    } catch (error) {
      res.status(500).json({ error: "Failed to save question" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
