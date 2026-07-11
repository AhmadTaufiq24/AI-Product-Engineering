import { getModel } from "./utils";
import { createCompletion } from "@anvia/core";
import "dotenv/config";
import { Document } from "@anvia/core";

const SYSTEM_PROMPT = `
  "You are an expert nutritionist"`;

const documents = [
  {
    id: 1,
    text: "PT Indonesia Merah Putih has a free meal program called MBG",
  },
  {
    id: 2,
    text: "Free meal program PT Indonesia Merah Putih",
  },
  {
    id: 3,
    text: "Free milk that served from PT Indonesia Merah Putih has a high sugar composition",
  }
];
 
const response = await createCompletion(getModel(), {
  instructions: SYSTEM_PROMPT,
  input: "Apakah susu MBG itu sehat untuk penderita diabetes?",
  documents: documents,
});

console.log(response.text);