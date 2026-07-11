import { Worker } from "bullmq";
import { AI_SKILL_GAP_QUEUE_NAME, connection } from "./utils/queue-config.js";
import { generateSkillGapAnalysis } from "./modules/skill-gap/services.js";
import "dotenv/config.js";
import { getBaseSkillGapPrompt, getSkillGapReportPrompt, getLearningRoadmapPrompt, getPortfolioProjectPrompt, getSkillGapSummaryPrompt } from "./modules/skill-gap/prompt.js";
import { mkdir } from "node:fs/promises";
import { mdToPdf } from "md-to-pdf";


export const worker = new Worker(
  AI_SKILL_GAP_QUEUE_NAME,
  async (job) => {
    const context = `
      ...
    `;

    const currentData = new Date().toDateString();

    const prompts = [
      getBaseSkillGapPrompt(currentData),
      getSkillGapReportPrompt(currentData),
      getLearningRoadmapPrompt(currentData),
      getPortfolioProjectPrompt(currentData),
      getSkillGapSummaryPrompt(currentData),
    ];

    let finalVerdicts = "";

    for (const prompt of prompts) {
      console.log("generating for", prompt.slice(0, 100));

      const response = await generateSkillGapAnalysis(
        context,
        prompt
      );

      finalVerdicts += response + "\n\n";
    } // <-- TUTUP FOR LOOP DI SINI

    console.log("final verdicts", finalVerdicts);

    await mkdir("reports", {
      recursive: true,
    });

    const filePath = `reports/${job.data.id}.pdf`;

    const pdf = await mdToPdf(
      {
        content: finalVerdicts,
      },
      {
        dest: filePath,
      }
    );

    if (!pdf) {
      throw new Error("PDF generation failed");
    }

    console.log("report generated", filePath);
    console.log("skill gap analysis completed");

    return {
      filePath,
    };
  },
  { connection }
);
