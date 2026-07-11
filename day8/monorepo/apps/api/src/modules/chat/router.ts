import { Hono } from "hono";
import { createCompletionStream } from "@anvia/core/completion";
import { getModel } from "../../utils/openai.js";
import { createEventStream } from "@anvia/server";



export const chatRouter = new Hono()
  .post("/", async (c) => {
    const body = await c.req.json();
    console.log(body);
    const model = getModel();
    const stream = createCompletionStream(model, {
      messages: body.messages
    });
    return createEventStream(stream, {
      format: "jsonl"
    })

    
  });