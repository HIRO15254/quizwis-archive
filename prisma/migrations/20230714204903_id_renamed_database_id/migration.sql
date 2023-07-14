/*
  Warnings:

  - The primary key for the `Genre` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Genre` table. All the data in the column will be lost.
  - The primary key for the `GenreSet` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `GenreSet` table. All the data in the column will be lost.
  - The primary key for the `Quiz` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Quiz` table. All the data in the column will be lost.
  - The primary key for the `QuizList` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `QuizList` table. All the data in the column will be lost.
  - The required column `databaseId` was added to the `Genre` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `databaseId` was added to the `GenreSet` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `databaseId` was added to the `Quiz` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `databaseId` was added to the `QuizList` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Genre" DROP CONSTRAINT "Genre_genreSetId_fkey";

-- DropForeignKey
ALTER TABLE "Genre" DROP CONSTRAINT "Genre_parentGenreId_fkey";

-- DropForeignKey
ALTER TABLE "Quiz" DROP CONSTRAINT "Quiz_genreId_fkey";

-- DropForeignKey
ALTER TABLE "Quiz" DROP CONSTRAINT "Quiz_quizlistId_fkey";

-- DropForeignKey
ALTER TABLE "QuizList" DROP CONSTRAINT "QuizList_genreSetId_fkey";

-- AlterTable
ALTER TABLE "Genre" DROP CONSTRAINT "Genre_pkey",
DROP COLUMN "id",
ADD COLUMN     "databaseId" TEXT NOT NULL,
ADD CONSTRAINT "Genre_pkey" PRIMARY KEY ("databaseId");

-- AlterTable
ALTER TABLE "GenreSet" DROP CONSTRAINT "GenreSet_pkey",
DROP COLUMN "id",
ADD COLUMN     "databaseId" TEXT NOT NULL,
ADD CONSTRAINT "GenreSet_pkey" PRIMARY KEY ("databaseId");

-- AlterTable
ALTER TABLE "Quiz" DROP CONSTRAINT "Quiz_pkey",
DROP COLUMN "id",
ADD COLUMN     "databaseId" TEXT NOT NULL,
ADD CONSTRAINT "Quiz_pkey" PRIMARY KEY ("databaseId");

-- AlterTable
ALTER TABLE "QuizList" DROP CONSTRAINT "QuizList_pkey",
DROP COLUMN "id",
ADD COLUMN     "databaseId" TEXT NOT NULL,
ADD CONSTRAINT "QuizList_pkey" PRIMARY KEY ("databaseId");

-- AddForeignKey
ALTER TABLE "QuizList" ADD CONSTRAINT "QuizList_genreSetId_fkey" FOREIGN KEY ("genreSetId") REFERENCES "GenreSet"("databaseId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_quizlistId_fkey" FOREIGN KEY ("quizlistId") REFERENCES "QuizList"("databaseId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("databaseId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Genre" ADD CONSTRAINT "Genre_genreSetId_fkey" FOREIGN KEY ("genreSetId") REFERENCES "GenreSet"("databaseId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Genre" ADD CONSTRAINT "Genre_parentGenreId_fkey" FOREIGN KEY ("parentGenreId") REFERENCES "Genre"("databaseId") ON DELETE CASCADE ON UPDATE CASCADE;
