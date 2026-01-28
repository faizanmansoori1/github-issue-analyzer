import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function analyzeIssues(prompt, issuesText) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You analyze GitHub issues for maintainers." },
      { role: "user", content: `${prompt}\n\n${issuesText}` },
    ],
  });

  return response.choices[0].message.content;
}
