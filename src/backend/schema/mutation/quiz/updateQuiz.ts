import { prisma } from '../../../../lib/prisma';
import { checkAuthority } from '../../../util/checkAuthority';
import { nullToEmpty } from '../../../util/nullToEmpty';
import { builder } from '../../builder';
import { Quiz } from '../../object/quiz';

const UpdateQuizInput = builder.inputType('UpdateQuizInput', {
  fields: (t) => ({
    quizDatabaseId: t.string({ required: true }),
    question: t.string(),
    answer: t.string(),
    explanation: t.string(),
    otherAnswer: t.string(),
    source: t.string(),
    genreName: t.string(),
  }),
});

builder.mutationFields((t) => ({
  updateQuiz: t.prismaField({
    type: Quiz,
    args: {
      input: t.arg({ type: UpdateQuizInput, required: true }),
    },
    resolve: async (_query, _root, args, ctx, _info) => {
      const quiz = await prisma.quiz.findUniqueOrThrow({
        where: { databaseId: args.input.quizDatabaseId },
        include: { user: true, quizList: { include: { genreSet: true } } },
      });
      let newGenre;
      if (args.input.genreName !== undefined) {
        newGenre = await prisma.genre.findUnique({
          where: { genreSetId_name: { genreSetId: quiz.quizList.genreSetId ?? '', name: args.input.genreName ?? '' } },
        });
      }
      if (quiz.user.userId !== ctx.currentUserId) {
        if (!await checkAuthority(ctx.currentUserId, 'ADMIN')) {
          throw new Error('権限がありません。');
        }
      }
      const ret = await prisma.quiz.update({
        where: { databaseId: args.input.quizDatabaseId },
        data: {
          question: nullToEmpty(args.input.question),
          answer: nullToEmpty(args.input.answer),
          explanation: nullToEmpty(args.input.explanation),
          otherAnswer: nullToEmpty(args.input.otherAnswer),
          source: nullToEmpty(args.input.source),
          genre: newGenre ? { connect: { databaseId: newGenre.databaseId } } : { disconnect: true },
        },
      });
      return ret;
    },
  }),
}));
