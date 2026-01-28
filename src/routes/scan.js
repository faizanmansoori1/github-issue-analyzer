import express from "express";
import { fetchOpenIssues } from "../github.js";
import { db } from "../db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { repo } = req.body;
  if (!repo) {
    return res.status(400).json({ error: "repo is required" });
  }

  try {
    const issues = await fetchOpenIssues(repo);

    const stmt = db.prepare(`
      INSERT OR REPLACE INTO issues
      (id, repo, title, body, html_url, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    issues.forEach((issue) => {
      stmt.run(
        issue.id,
        repo,
        issue.title,
        issue.body || "",
        issue.html_url,
        issue.created_at,
      );
    });

    stmt.finalize();

    res.json({
      repo,
      issues_fetched: issues.length,
      cached_successfully: true,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
