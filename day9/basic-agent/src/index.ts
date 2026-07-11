import { getModel } from "./models.js";
import { AgentBuilder } from "@anvia/core";
import { Studio } from "@anvia/studio";

const model = getModel("gpt");

const agent = new AgentBuilder("assistant", model)
  .instructions("You are a helpful assistant")
  .defaultMaxTurns(50)
  .build();

new Studio({ agent }).start();

