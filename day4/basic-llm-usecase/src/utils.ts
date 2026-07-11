import "dotenv/config";
import { OpenAIClient } from "@anvia/openai";
import { tavily } from "@tavily/core";

const openClient = new OpenAIClient({
  baseUrl: process.env.SUMOPOD_BASE_URL,
  apiKey: process.env.SUMOPOD_API_KEY,
});

export function getModel(model: string = "gpt-4o-mini") {
  return openClient.completionModel(model);
}

export const tavilyClient = tavily({
  apiKey: process.env.TAVILY_API_KEY!,
});