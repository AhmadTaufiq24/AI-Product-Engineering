import { OpenAIClient } from "@anvia/openai";
import "dotenv/config"

export const openaiClient = new OpenAIClient({
  baseUrl: process.env.OPENAI_BASE_URL,
  apiKey: process.env.OPENAI_API_KEY,
})

export function getModel(modelId: string = "MiniMax-M2.7-highspeed") {
  return openaiClient.completionModel(modelId);
}