/*
  Warnings:

  - You are about to drop the column `jobLevel` on the `Reseaech` table. All the data in the column will be lost.
  - Added the required column `jobTitle` to the `Reseaech` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reseaech" DROP COLUMN "jobLevel",
ADD COLUMN     "jobTitle" TEXT NOT NULL;
