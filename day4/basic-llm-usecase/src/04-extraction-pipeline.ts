import { getModel, tavilyClient} from "./utils";
import { createCompletion, createParsedCompletion } from "@anvia/core";
import "dotenv/config";
import z from "zod";

const searchResults = await tavilyClient.search("Devscale Indonesia", {
  searchDepth: "basic",
});

const CompanyInformationSchema = z.object({
  name: z.string(),
  slogan: z.string(),
  address: z.string(),
  website: z.string(),
  stockTicker: z.string(),
});

const response = await createParsedCompletion(getModel(), {
  instruction: "Extract the company information from the following text. if you can't find the information please return null.",
  input: `Search results: ${JSON.stringify(searchResults.results)}`,
  schema: CompanyInformationSchema,
});


console.log(response.data);




