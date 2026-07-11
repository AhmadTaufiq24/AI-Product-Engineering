import { OpenAIClient } from "@anvia/openai";

export interface ClientConfig {
  apiKey: string;
}

export function getClient({ apiKey }: ClientConfig) {
  return new OpenAIClient({
    apiKey,
  });
}