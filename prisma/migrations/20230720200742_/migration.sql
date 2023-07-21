-- DropForeignKey
ALTER TABLE "Quiz" DROP CONSTRAINT "Quiz_genreId_fkey";

-- DropForeignKey
ALTER TABLE "QuizList" DROP CONSTRAINT "QuizList_genreSetId_fkey";

-- AddForeignKey
ALTER TABLE "QuizList" ADD CONSTRAINT "QuizList_genreSetId_fkey" FOREIGN KEY ("genreSetId") REFERENCES "GenreSet"("databaseId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("databaseId") ON DELETE SET NULL ON UPDATE CASCADE;
