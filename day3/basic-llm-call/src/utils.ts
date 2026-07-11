import { OpenAIClient } from "@anvia/openai";
import { AnthropicClient } from "@anvia/anthropic";

import "dotenv/config";

export const openAiClient = new OpenAIClient({
  baseUrl: process.env.OPENAI_BASE_URL,
  apiKey: process.env.OPENAI_API_KEY,
});

export const anthropicClient = new AnthropicClient({
  baseUrl: process.env.ANTHROPIC_BASE_URL,
  apiKey: process.env.ANTHROPIC_API_KEY,
});

