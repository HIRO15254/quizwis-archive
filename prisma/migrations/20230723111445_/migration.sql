/*
  Warnings:

  - Made the column `description` on table `QuizList` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "QuizList" ALTER COLUMN "description" SET NOT NULL;
