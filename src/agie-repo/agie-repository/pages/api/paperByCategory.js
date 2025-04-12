// pages/api/paperByCategory.js
import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

const CATEGORY_FILE_MAP = {
  Belonging: "AGIE_BELONGING.csv",
  "Career & Life Integration": "AGIE_CAREER-LIFE.csv",
  "Evaluation & Workload": "AGIE_EVALUATION&WORKLOAD.csv",
  Harassment: "AGIE_HARASSMENT.csv",
  "Inclusive Culture": "AGIE_INCLUSIVE_CULTURE.csv",
  "Leadership & Advancement": "AGIE_LEADERSHIP_ADVANCEMENT.csv",
  Mentorship: "AGIE_MENTORSHIP.csv",
  "Pay Equity": "AGIE_PAY_EQUITY.csv",
  Recruitment: "AGIE_RECRUITMENT.csv",
  Retention: "AGIE_RETENTION.csv",
  "Tenure & Promotion": "AGIE_TENURE&PROMOTION.csv",
};

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { categoryName } = req.query;
  if (!categoryName) {
    return res
      .status(400)
      .json({ error: "Missing categoryName query parameter" });
  }

  // Normalize categoryName into an array
  const categories = Array.isArray(categoryName)
    ? categoryName
    : [categoryName];

  let allResults = [];

  for (const category of categories) {
    const fileName = CATEGORY_FILE_MAP[category.trim()];
    if (!fileName) {
      console.warn(`No matching file for category: ${category}`);
      continue; // skip unknown category
    }

    const filePath = path.join(process.cwd(), "..", "AGIE_DATA", fileName);

    try {
      const fileContent = fs.readFileSync(filePath, "utf8");
      const records = parse(fileContent, {
        columns: true, // Assumes the CSV has header row
        skip_empty_lines: true,
      });
      allResults.push(...records);
    } catch (err) {
      console.error(
        `Failed to load file for category "${category}" -> ${fileName}:`,
        err.message
      );
      // Skip if file doesn't exist or errors
    }
  }

  return res.status(200).json(allResults);
}
