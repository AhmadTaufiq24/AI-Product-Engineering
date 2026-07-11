import { OpenAIClient } from "@anvia/openai";

export function getModel(modelName: string) {
  const client = new OpenAIClient({  });
  return client;
}

