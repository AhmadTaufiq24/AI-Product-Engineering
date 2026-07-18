import { AgentBuilder } from "@anvia/core";
import type { AnyTool, CompletionModel } from "@anvia/core";
import { BASE_INSTRUCTIONS } from "../prompts/base-instruction.js"
import { prismaMemory } from "../core/memory.js"
import { observer } from "../utils/logger.js"


interface AgentArgs {
  agentId: string;
  model: CompletionModel,
  tools: AnyTool[];
}

export function createAgent(agent: AgentArgs) {
  return new AgentBuilder(agent.agentId, agent.model)
    .instructions(BASE_INSTRUCTIONS)
    .memory(prismaMemory)
    .observe(observer)
    .tools(agent.tools)
}