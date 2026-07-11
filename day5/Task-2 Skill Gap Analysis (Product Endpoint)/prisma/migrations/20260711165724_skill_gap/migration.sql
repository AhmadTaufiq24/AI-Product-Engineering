/*
  Warnings:

  - You are about to drop the `Reseaech` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Reseaech";

-- CreateTable
CREATE TABLE "SkillGap" (
    "id" SERIAL NOT NULL,
    "currentRole" TEXT NOT NULL,
    "targetRole" TEXT NOT NULL,
    "yearsExperience" INTEGER NOT NULL,
    "skills" JSONB NOT NULL,
    "tools" JSONB NOT NULL,
    "education" TEXT NOT NULL,
    "goal" TEXT NOT NULL,
    "isDone" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "SkillGap_pkey" PRIMARY KEY ("id")
);
