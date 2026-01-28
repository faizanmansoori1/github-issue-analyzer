# GitHub Issue Analyzer

A backend service that fetches, caches, and analyzes GitHub issues using an LLM.

## Endpoints

### POST /scan

Fetches all open issues from a GitHub repository and caches them locally.

Request:
{
"repo": "owner/repo"
}

### POST /analyze

Analyzes cached issues using a natural-language prompt.

Request:
{
"repo": "owner/repo",
"prompt": "Find themes and suggest priorities"
}

## Storage Choice

SQLite was chosen for durability, simplicity, and ease of inspection during demos.

## Setup

1. Copy `.env.example` to `.env`
2. Add your OpenAI API key
3. Run `npm install`
4. Start server: `npm start`
