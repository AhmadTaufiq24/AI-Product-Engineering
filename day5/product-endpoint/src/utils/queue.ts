import { Queue } from "bullmq";
import { AIRESEARCH_QUEUE_NAME, connection } from "./queue-config.js";
export const aiResearchQueue = new Queue(AIRESEARCH_QUEUE_NAME, {
  connection,
});
