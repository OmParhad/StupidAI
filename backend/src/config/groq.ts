import OpenAI from "openai";

const provider = process.env.AI_PROVIDER ?? "groq";
const isOpenRouter = provider === "openrouter";
const apiKey = isOpenRouter
  ? process.env.OPENROUTER_API_KEY
  : process.env.GROQ_API_KEY;

if (!apiKey) {
  throw new Error(
    `${isOpenRouter ? "OPENROUTER_API_KEY" : "GROQ_API_KEY"} is missing from the environment.`
  );
}

export const groq = new OpenAI({
  apiKey,
  baseURL: isOpenRouter
    ? "https://openrouter.ai/api/v1"
    : "https://api.groq.com/openai/v1",
  ...(isOpenRouter
    ? {
        defaultHeaders: {
          "HTTP-Referer": process.env.OPENROUTER_SITE_URL ?? "http://localhost:5173",
          "X-Title": "Stupid AI",
        },
      }
    : {}),
});

export const model = isOpenRouter
  ? process.env.OPENROUTER_MODEL ?? "meta-llama/llama-3.2-3b-instruct:free"
  : process.env.GROQ_MODEL ?? "openai/gpt-oss-20b";
