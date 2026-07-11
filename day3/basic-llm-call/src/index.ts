import { createCompletionStream, Message } from "@anvia/core";
import { openAiClient } from "./utils";
import { input, select } from "@inquirer/prompts";

const gptmodel = openAiClient.completionModel("gpt-4o-mini");

const messages: Message[] = [];

async function main() {
  const selectedModel = await select({
    message: "Select a model:\n",
    choices: [
      { name: "gpt-4o-mini", value: gptmodel },
    ],
  });
  
  while (true) {
    const userInput = await input({ message: "You:\n" })
    if (userInput.toLowerCase() === "exit") { 
      break;
    } 

    const stream = createCompletionStream(selectedModel, {
      instructions: "You are a helpful assistant",
      input: userInput,
      messages,
    });

    let assistantResponse = "Hello, how can I help you";
    console.log("\nAssistant:");
    for await (const chunk of stream) {
      if (chunk.type === "text_delta") {
        process.stdout.write(chunk.delta);
        assistantResponse += chunk.delta;
      }
    }
    console.log("\n");

    messages.push(Message.user(userInput), Message.assistant(assistantResponse));
  }
}

main();

console.log(messages);


