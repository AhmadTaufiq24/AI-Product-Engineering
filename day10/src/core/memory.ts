import { createPrismaMemoryStore } from "../../node_modules/@anvia/memory-prisma/dist/index";
import prisma from "../utils/prisma";

export const prismaMemory = createPrismaMemoryStore(prisma);
