import express from "express";
import { db } from "../db.js";
import { analyzeIssues } from "../llm.js";

const router = express.Router();

router.post("/", (req, res) => {
  const { repo, prompt } = req.body;
  if (!repo || !prompt) {
    return res.status(400).json({ error: "repo and prompt required" });
  }

  db.all(
    "SELECT title, body FROM issues WHERE repo = ?",
    [repo],
    async (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      if (rows.length === 0) {
        return res.status(404).json({ error: "Repo not scanned yet" });
      }

      const issuesText = rows
        .map((i, idx) => `Issue ${idx + 1}: ${i.title}\n${i.body}`)
        .join("\n\n");

      try {
        const analysis = await analyzeIssues(prompt, issuesText);
        res.json({ analysis });
      } catch (e) {
        res.status(500).json({ error: JSON.stringify(e) });
      }
    },
  );
});

export default router;
