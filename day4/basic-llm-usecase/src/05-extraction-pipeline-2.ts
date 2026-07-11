import { getModel, tavilyClient} from "./utils";
import { createCompletion, createParsedCompletion } from "@anvia/core";
import "dotenv/config";
import z from "zod";

const SearchQueriesSchema = z.object({
  queries: z.array(z.string()),
});

const userInput = "PT Ultra Sakti";

const SYSTEM_PROMPT = `
  You are an expert in company research. What you need to find is detailed company informations including
  the company's name, industry, location, and any other relevant details.

  Generate 5 most important query to be searched in google to get the most detailed information about the company
  `;

 
const response = await createParsedCompletion(getModel(), {
  instructions: SYSTEM_PROMPT,
  input: `User input: ${userInput}`,
  schema: SearchQueriesSchema,
});

console.log(response.data.queries);

const data = await Promise.all(response.data.queries.map(async (query) => {
  const searchResults = await tavilyClient.search(query, {
    searchDepth: "basic",
  });
  return searchResults;
}));

console.log(data);

// const searchResults = await tavilyClient.search("Devscale Indonesia", {
//   searchDepth: "basic",
// });

// const CompanyInformationSchema = z.object({
//   name: z.string(),
//   slogan: z.string(),
//   address: z.string(),
//   website: z.string(),
//   stockTicker: z.string(),
// });

// const response = await createParsedCompletion(getModel(), {
//   instruction: "Extract the company information from the following text. if you can't find the information please return null.",
//   input: `Search results: ${JSON.stringify(searchResults.results)}`,
//   schema: CompanyInformationSchema,
// });


// console.log(response.data);




