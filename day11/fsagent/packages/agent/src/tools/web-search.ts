import z from "zod"
import { createTool } from "@anvia/core"
import { tavily } from "@tavily/core"

const tavilyClient = tavily({
  apiKey: process.env.TAVILY_API_KEY || "",
})

export function createWebTools() {
  const searchWeb = createTool({
    name: "searchWeb",
    description: "Search the web for a given query.",
    input: z.object({
      query: z.string()
    }),
    execute: async ({ query }) => {
      const res = await tavilyClient.search(query);
      return res.results
    }
  })

  const scrapUrl = createTool({
    name: "scrapUrl",
    description: "Scrap the content of a URL.",
    input: z.object({
      url: z.string()
    }),
    execute: async ({ url }) => {
      const res = await tavilyClient.extract([url]);
      return res.results
    }
  })

  return [searchWeb, scrapUrl]
}

