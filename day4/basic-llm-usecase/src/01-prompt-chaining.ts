import { getModel } from "./utils";
import { createCompletion } from "@anvia/core";
import "dotenv/config";

async function callLLM(input: string, instructions: string) {
    return createCompletion(getModel(), {
      instructions,
      input
    });
}

// -> Extracting CV
// -> Gather context for user
// -> Scoring (Field/Industry)
// -> Gather context based on Score
// -> Generate PDF Report
// -> Extract PDF Report (Text) => Structured Output (For Product Frontend)

const draft = await callLLM(
  "You write concise product copy for developers.",
  "Write a two-sentence description of a TypeScript AI SDK"
);

const edited = await callLLM(
  "You write concise product copy for developers.",
  `Edit the following description to make it more concise: ${draft.text}`
);

const translated = await callLLM(
  "You write concise product copy for developers.",
  `Translate the following description to Indonesia: ${edited.text}`
);

console.log(translated.text);