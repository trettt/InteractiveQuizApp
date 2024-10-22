import { promises as fs } from "fs";
import path from "path";

export default async function GET(req, res) {
  const filePath = path.join(process.cwd(), "data", "quizzes.json");

  try {
    const fileContents = await fs.readFile(filePath, "utf-8");
    const quizzes = JSON.parse(fileContents);
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ error: "Failed to load quizzes" });
  }
}
