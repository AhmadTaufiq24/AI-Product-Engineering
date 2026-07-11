import { Worker } from "bullmq";
import { AIRESEARCH_QUEUE_NAME, connection } from "./utils/queue-config.js";
import { generatePerspective } from "./modules/research/services.js";
import "dotenv/config.js";
import { prisma } from "./utils/prisma.js";
import { getCareerPivotingPrompt, getJobReportPrompt, getMarketDemandPrompt, getMotivationAndConsequencePrompt } from "./modules/research/prompt.js";
import { mkdir } from "node:fs/promises";
import { mdToPdf } from "md-to-pdf";


export const worker = new Worker(AIRESEARCH_QUEUE_NAME,
  async (job) => {
      const context = `
        Job Title: ${job.data.jobTitle}
        Level: ${job.data.level}
        Industry: ${job.data.industry}
        Additional Info: ${job.data.additionalInfo}
        
      `;

    const currentData = new Date().toDateString();
    
    const prompts = [
      getCareerPivotingPrompt(currentData),
      getJobReportPrompt(currentData),
      getMarketDemandPrompt(currentData),
      getMotivationAndConsequencePrompt(currentData),
    ];

    let finalVerdicts = "";

    for (const prompt of prompts) {
      console.log("generating for", prompt.slice(0, 100));
      const response = await generatePerspective(prompt);
      finalVerdicts += response + "\n\n";
    }

    console.log("final verdicts", finalVerdicts);

    await mkdir("reports");
    const filePath = `reports/${job.data.id}.pdf`;

    try {
      await mdToPdf({ content: finalVerdicts }, { dest: filePath });
    } catch (error) {
      console.error("failed to generate report", error);
    }

    console.log("report generated", filePath);
    
      // console.log(context);
      // const OPENAI_API_KEY = process.env.OPENAI_API_KEY as string;
      // console.log(OPENAI_API_KEY);
      // 
    // const OPENAI_API_KEY = process.env.OPENAI_API_KEY as string;
    // console.log(OPENAI_API_KEY);

      // const response = await generatePerspective(context);
      // console.log(response);

    // Search in Internet
    // Generate AI Comments
      
    console.log("job completed");

    // await prisma.reseaech.update({
    //   where: {
    //     id: job.data.id,
    //   },
    //   data: {
    //     isDone: true,
    //   },
    // })
    }, 
  { connection });