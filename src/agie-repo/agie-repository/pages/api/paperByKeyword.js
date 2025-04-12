// pages/api/paperByKeyword.js
import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

export default async function handler(req, res) {
  try {
    const { words } = req.query;
    if (!words) {
      return res.status(200).json([]);
    }

    const searchTerms = words
      .split(" ")
      .map((term) => term.trim().toLowerCase())
      .filter((term) => term.length > 0);

    // Read ALL_DATA.csv from the AGIE_DATA directory (one level above current folder)
    const csvPath = path.join(process.cwd(), "..", "AGIE_DATA", "ALL_DATA.csv");
    const fileContent = fs.readFileSync(csvPath, "utf8");

    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
    });

    // Filter records where ANY of the search terms appear in title or content
    const filtered = records.filter((record) => {
      const title = (record.Title || "").toLowerCase();
      const content = (record.Abstract || record.content || "").toLowerCase();

      return searchTerms.some(
        (term) => title.includes(term) || content.includes(term)
      );
    });

    res.status(200).json(filtered);
  } catch (error) {
    console.error("Error reading CSV for keyword search:", error);
    res.status(500).json({ error: "Failed to search CSV by keyword" });
  }
}
