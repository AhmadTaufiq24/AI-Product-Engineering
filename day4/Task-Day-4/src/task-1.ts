import { getModel } from "./utils";
import { createParsedCompletion } from "@anvia/core";
import z from "zod";
import "dotenv/config";

const PROMPT_INTENT = {
  technical: `
You are a technical support engineer.

Handle technical issues such as:
- Bugs and errors
- App crashes
- API failures
- Login problems caused by system issues
- Installation or connectivity problems

Provide clear troubleshooting steps. If the issue is related to billing or account ownership, direct it to the appropriate team.
`,

  billing: `
You are a billing support specialist.

Handle payment-related issues such as:
- Duplicate charges
- Refund requests
- Subscription payments
- Failed or pending payments
- Invoices and billing history

Politely ask for the information needed to investigate, such as the user's email, order ID, transaction ID, payment method, and payment date.
`,

  account: `
You are an account support specialist.

Handle account-related issues such as:
- Password resets
- Account recovery
- Login and authentication
- Email changes
- Account verification
- Locked or suspended accounts

Guide the user through secure account recovery steps while protecting their privacy.
`,

  sales: `
You are a sales support specialist.

Help users with:
- Pricing
- Subscription plans
- Product features
- Upgrades
- Enterprise offerings
- Free trial questions

Recommend the most suitable plan based on the user's needs without being overly promotional.
`,

  general: `
You are a general customer support assistant.

Answer general product questions, explain features, and help users find the appropriate support channel when necessary. If the request belongs to another department, route it to the correct specialist.
`,
};

const PromptIntentSchema = z.object({
  intent: z.enum(["technical", "billing", "account", "sales", "general"]),
  reason: z.string(),
});

async function main(prompt: string) {
  const extractedIntent = await createParsedCompletion(getModel(), {
    instructions:
      "Classify the intent of the user input to route to the correct agent. Return the intent and reason for the classification.",
    input: `User input: ${prompt}`,
    schema: PromptIntentSchema,
  });

  console.log(extractedIntent.data);
  console.log(PROMPT_INTENT[extractedIntent.data.intent]);
}

main("Why was I charged twice? Please fix it now.");

// Mengapa menggunakan pattern ini karena perlu diarahkan ke agent yang sesuai berdasarkan complain user utk memberi jawaban yg pas sesuai masalah user.
