import { getModel, tavilyClient } from "./utils";
import { createParsedCompletion } from "@anvia/core";
import "dotenv/config";
import z from "zod";

const SearchQueriesSchema = z.object({
  queries: z.array(z.string()),
});

const userInput = "PT Mobilitas Transisi Energi";

const SYSTEM_PROMPT = `
  You are a company research assistant.
  
  Using the search results provided, create a short company profile.
  
  Include:
  
  - Company Name
  
  - Industry
  
  - Official Website
  
  - Short Description (2-3 sentences)
  
  If any information is unavailable, explicitly say "Not found"
`;

const response = await createParsedCompletion(getModel(), {
  instructions: SYSTEM_PROMPT,
  input: `User input: ${userInput}`,
  schema: SearchQueriesSchema,
});

console.log(response.data.queries);

const data = await Promise.all(
  response.data.queries.map(async (query) => {
    const searchResult = await tavilyClient.search(query, {
      searchDepth: "basic",
    });
    return searchResult;
  }),
);

console.log(data);

// Menggunakan Research Extraction Pipeline untuk mendapatkan informasi lebih detail tentang perusahaan.
