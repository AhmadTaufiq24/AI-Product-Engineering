import { Queue } from "bullmq";
import { AI_SKILL_GAP_QUEUE_NAME, connection } from "./queue-config.js";
export const aiSkillGapQueue = new Queue(AI_SKILL_GAP_QUEUE_NAME, {
  connection,
});
