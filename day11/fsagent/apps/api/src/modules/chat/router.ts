import { Hono } from "hono";
import { createAgent, tracing } from "@devscale/agent";
import { createEventStream } from "@anvia/server";
import { createPrismaMemoryStore } from "@anvia/memory-prisma";
import { prisma } from "../../utils/prisma.js";

const SESSION_ID = "session-123"

export const chatRouter = new Hono().get('/', async (c) => {
  const prismaMemory = createPrismaMemoryStore(prisma)
  const messages = await prismaMemory.load({
    sessionId: SESSION_ID,
  })

  return c.json(messages)
  
}).post('/', async (c) => {
  const body = await c.req.json()
  const messages = body.messages
  const lastMessage = messages.at(-1)

  const prismaMemory = createPrismaMemoryStore(prisma)
  
  const agent = createAgent({
    agentId: "personal-assistant",
    tracing: tracing,
    additionalInstructions: [],
    additionalTools: [],
    memory: prismaMemory,
  });

  const stream = agent.session(SESSION_ID).prompt(lastMessage).withTrace({sessionId: SESSION_ID}).stream()

  return createEventStream(stream, {
    format: "jsonl",
  });
});