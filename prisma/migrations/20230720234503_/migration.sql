/*
  Warnings:

  - Made the column `ratio` on table `Genre` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Genre" ADD COLUMN     "color" TEXT,
ALTER COLUMN "ratio" SET NOT NULL,
ALTER COLUMN "ratio" SET DEFAULT 1;
