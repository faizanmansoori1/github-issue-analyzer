import sqlite3 from "sqlite3";

export const db = new sqlite3.Database("./issues.db");

db.run(`
  CREATE TABLE IF NOT EXISTS issues (
    id INTEGER PRIMARY KEY,
    repo TEXT NOT NULL,
    title TEXT,
    body TEXT,
    html_url TEXT,
    created_at TEXT
  )
`);
