// src/lib/openai.ts
import OpenAI from "openai";

export const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_KEY, // put key in .env
  dangerouslyAllowBrowser: true, // only for prototyping in browser
});
