import type { ConnectionOptions } from "bullmq";

export const AIRESEARCH_QUEUE_NAME = "ai-research";

export const connection: ConnectionOptions = {
  host: "localhost",
  port: 6379,
  db: 0,
}