import { getModel } from "./utils";
import { createParsedCompletion } from "@anvia/core";
import "dotenv/config";
import { z } from "zod";


const PROMPT_INTENT = {
  technical:
    "You are a technical support engineer. Give concrete debugging steps.",
  nonTechnical:
    "You are a non-technical support engineer. Give general troubleshooting steps.",
  general:
    "You are a general support engineer. Give general troubleshooting steps.",
};

const PromptIntentSchema = z.object({
  intent: z.enum(["technical", "nonTechnical", "general"]),
  reason: z.string(),
});

async function main(prompt: string) {
  const extractedIntent = await createParsedCompletion(getModel(), {
    instructions: "Classify the intent and reason for the user input.",
    input: `User input: ${prompt}`,
    schema: PromptIntentSchema,
  });

  console.log(extractedIntent.data);
  console.log(PROMPT_INTENT[extractedIntent.data.intent]);

  // -> Next step ?
}

main("How can i get a refund for my order?");
