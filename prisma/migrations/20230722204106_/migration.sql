/*
  Warnings:

  - Made the column `description` on table `Genre` required. This step will fail if there are existing NULL values in that column.
  - Made the column `color` on table `Genre` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Genre" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "color" SET NOT NULL;
