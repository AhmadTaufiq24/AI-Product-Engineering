import { z } from 'zod'

export const SkillGapSchema = z.object({
  currentRole: z.string(),
  targetRole: z.string(),
  yearsExperience: z.number(),
  skills: z.array(z.string()),
  tools: z.array(z.string()),
  education: z.string(),
  goal: z.string(),
})

