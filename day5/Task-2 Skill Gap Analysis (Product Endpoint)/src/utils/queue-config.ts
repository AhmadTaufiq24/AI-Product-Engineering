import type { ConnectionOptions } from "bullmq";

export const AI_SKILL_GAP_QUEUE_NAME = "ai-research";

export const connection: ConnectionOptions = {
  host: "localhost",
  port: 6379,
  db: 0,
}