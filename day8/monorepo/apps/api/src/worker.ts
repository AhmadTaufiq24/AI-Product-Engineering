import { Worker } from "bullmq";
import { QUEUE_NAME } from "./config/queue-connection.js";
import { connection } from "./config/queue-connection.js";

export const worker = new Worker(
  QUEUE_NAME,
  async (job) => {
  
}, {
  connection: connection,
});
