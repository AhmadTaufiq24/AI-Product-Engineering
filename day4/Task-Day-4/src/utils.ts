import { OpenAIClient } from "@anvia/openai";
import { tavily } from "@tavily/core";
import "dotenv/config.js";

const openClient = new OpenAIClient({
  apiKey: process.env.OPENAI_API_KEY,
});

export function getModel(model: string = "gpt-4o-mini") {
  return openClient.completionModel(model);
}

export const tavilyClient = tavily({
  apiKey: process.env.TAVILY_API_KEY!,
});