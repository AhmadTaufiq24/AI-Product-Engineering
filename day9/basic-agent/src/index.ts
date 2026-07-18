import { Studio } from "@anvia/studio";
import { buildAgent } from "./agent.js";
import { scrapUrl, searchWeb } from "./tools/internet-tools.js";

const internetAgent = buildAgent([searchWeb, scrapUrl])
  .instructions("Always use internet tools")
  .context("CEO of Devscale Indonesia is Randy Pamungkas", "devscale-ceo")
  .build()

new Studio([internetAgent]).start()

// const getWeather = createTool({
//   name: "getWeather",
//   description: "Use this when user asking about realtime whether information",
//   input: z.object({
//     location: z.string()
//   }),
//   execute: async ({ location }) => {
//     return `The weather in ${location} is sunny.`
//   }
// })

// const model = getModel("deepseek-v4-pro");

// const agent = new AgentBuilder("assistant", model)
//   .instructions("You are a helpful assistant, please do deep thinking")
//   .tools([getWeather])
//   .defaultMaxTurns(50)
//   .build()

// new Studio([agent]).start();




