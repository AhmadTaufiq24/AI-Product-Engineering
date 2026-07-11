import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { SkillGapSchema } from './schema.js'
import { aiSkillGapQueue } from '../../utils/queue.js';
import { prisma } from '../../utils/prisma.js';



export const skillGapRouter = new Hono()
  .get('/', async (c) => {
    const skillGaps = await prisma.skillGap.findMany()
    return c.json(skillGaps);
  })
  .post('/',
    zValidator('json', SkillGapSchema),
    async (c) => {
      const body = c.req.valid('json')

      const { currentRole, targetRole, yearsExperience, skills, tools, education, goal } = body;

      const newSkillGap = await prisma.skillGap.create({
        data: {
          currentRole,
          targetRole,
          yearsExperience,
          skills,
          tools,
          education,
          goal,
        },
      })
      
      await aiSkillGapQueue.add("skill-gap", newSkillGap)
      
      return c.json({
        message: "Skill Gap Analysis is on queue",
        researchId: newSkillGap.id,
      });
    }
  );

