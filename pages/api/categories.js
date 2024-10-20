import { promises as fs } from "fs";
import path from "path";

export default async function GET(req, res) {
  const filePath = path.join(process.cwd(), "data", "categories.json");

  try {
    const fileContents = await fs.readFile(filePath, "utf-8");
    const categories = JSON.parse(fileContents);
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to load categories" });
  }
}
