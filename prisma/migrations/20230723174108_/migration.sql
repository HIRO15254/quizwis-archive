/*
  Warnings:

  - Made the column `question` on table `Quiz` required. This step will fail if there are existing NULL values in that column.
  - Made the column `answer` on table `Quiz` required. This step will fail if there are existing NULL values in that column.
  - Made the column `explanation` on table `Quiz` required. This step will fail if there are existing NULL values in that column.
  - Made the column `otherAnswer` on table `Quiz` required. This step will fail if there are existing NULL values in that column.
  - Made the column `source` on table `Quiz` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Quiz" ALTER COLUMN "question" SET NOT NULL,
ALTER COLUMN "answer" SET NOT NULL,
ALTER COLUMN "explanation" SET NOT NULL,
ALTER COLUMN "otherAnswer" SET NOT NULL,
ALTER COLUMN "source" SET NOT NULL;
