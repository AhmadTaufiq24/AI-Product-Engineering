import { AgentBuilder, type AnyTool, type CompletionModel, type MemoryStore } from "@anvia/core";
import { createWebTools } from "./tools/web-search";
import { BASE_INSTRUCTIONS } from "./prompts/base-instructions";
import type { LangfuseTracing } from "@anvia/langfuse";
import { getModel } from "./providers/openai.js";


interface CreateAgentOptions {
    agentId: string;
    model: CompletionModel;
    additionalTools?: AnyTool[];
    additionalInstructions?: string;
    tracing: LangfuseTracing;
    memory: MemoryStore;
}

export function createAgent(opts: CreateAgentOptions) {
  const agent = new AgentBuilder(opts.agentId, opts.model ?? getModel())
    .instructions(BASE_INSTRUCTIONS)
    .tools([...createWebTools(), ...(opts.additionalTools ?? [])])
    .memory(opts.memory)
    .observe(opts.tracing)
    .additionalParams({ cache_control: true });

  if (opts.additionalInstructions) {
    for (const instruction of opts.additionalInstructions) {
      agent.instructions(instruction);
    }
  }
  
  if (opts.memory) {
    agent.memory(opts.memory);
  }
  
  return agent.build()
}