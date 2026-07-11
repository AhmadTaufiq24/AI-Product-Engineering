import { z } from 'zod'

export const CreateResearchSchema = z.object({
  jobTitle: z.string(),
  level: z.string(),
  industry: z.string(),
  additionalInfo: z.string().optional(),
})