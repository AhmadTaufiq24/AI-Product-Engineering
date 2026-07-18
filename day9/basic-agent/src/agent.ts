import { AgentBuilder, type AnyTool } from "@anvia/core";
import { getModel } from "./model.js";
import { BASE_INSTRUCTION } from "./prompts/base-instructions.js";

const model = getModel("deepseek-v4-pro")

export function buildAgent (tools: AnyTool) {
  return new AgentBuilder("assistant", model)
    .instructions(BASE_INSTRUCTION)
    .tools(tools)
    .defaultMaxTurns(50)
}


