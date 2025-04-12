// pages/api/searchCsv.js
import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

export default async function handler(req, res) {
  const { term, field, limit } = req.query;
  const csvFilePath = path.join(
    process.cwd(),
    "..",
    "AGIE_DATA",
    "AGIE_ALL_DATA.csv"
  );

  try {
    const fileContent = fs.readFileSync(csvFilePath, "utf-8");
    const records = parse(fileContent, {
      columns: true, // Assumes the CSV has header row
      skip_empty_lines: true,
    });

    let filteredRecords = records;
    if (term && field) {
      const searchTermLower = term.toLowerCase();
      filteredRecords = records.filter(
        (record) =>
          record[field] && record[field].toLowerCase().includes(searchTermLower)
      );
    }

    const numericLimit = limit ? parseInt(limit, 10) : filteredRecords.length;
    const limitedRecords = filteredRecords.slice(0, numericLimit);

    res.status(200).json(limitedRecords);
  } catch (error) {
    console.error("Error reading or parsing CSV:", error);
    res.status(500).json({ error: "Error reading CSV file" });
  }
}
