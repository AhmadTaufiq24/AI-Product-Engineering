import { createAgent } from "./agent";
import { getModel } from "./providers/openai.js";
import { tracing } from "./tracing.js";

try {
  const agent = createAgent({
    agentId: "harness-agent",
    model: getModel(),
    tracing: tracing,
  });

const res = await agent.prompt("Tolong cari informasi tentang fable 5, harga dan benchmarknya!").send();
console.log(res.output);
console.log(res.usage);

} catch {  
  
} finally {
  tracing.flush();
}