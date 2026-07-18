import { createAgent } from "./core/agent";
import { getModel } from "./providers/openai";
import { searchWeb, scrapUrl } from "./tools/web-search";
import { Studio } from "@anvia/studio";
import { DockerSandbox, createSandboxTools } from "@anvia/sandbox";


const sandbox = DockerSandbox.node({
  network: false
})
const sandboxSession = await sandbox.createSession({ id: "anvia-demo-agent" });

const sandboxTools = createSandboxTools(sandboxSession);

const agent = createAgent({
  agentId: "hris-agent",
  model: getModel(),
  tools: [searchWeb, scrapUrl, ...sandboxTools],
}).build();

const studio = new Studio([agent]).serve({ port: 4021, onShutdown: async () => {
  await sandboxSession.destroy();
} });

// const res = await agent.session("123").prompt("Hello").send();
// console.log(res.output);

