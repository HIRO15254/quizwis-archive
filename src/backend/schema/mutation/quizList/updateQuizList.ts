import { prisma } from '../../../../lib/prisma';
import { checkAuthority } from '../../../util/checkAuthority';
import { builder } from '../../builder';

const UpdateQuizListInput = builder.inputType('UpdateQuizListInput', {
  fields: (t) => ({
    databaseId: t.string({ required: true }),
    name: t.string({ required: true }),
    description: t.string(),
    genreSetId: t.string(),
  }),
});

builder.mutationFields((t) => ({
  updateQuizList: t.prismaField({
    type: 'QuizList',
    args: {
      input: t.arg({ type: UpdateQuizListInput, required: true }),
    },
    resolve: async (_query, _root, args, ctx, _info) => {
      const quizList = await prisma.quizList.findUniqueOrThrow({
        where: { databaseId: args.input?.databaseId ?? '' },
        include: { user: true, genreSet: true, quizzes: true },
      });
      if (quizList?.user.userId !== ctx.currentUserId) {
        if (!await checkAuthority(ctx.currentUserId ?? '', 'ADMIN')) {
          throw new Error('権限がありません。');
        }
      }
      if (args.input.genreSetId && args.input.genreSetId !== quizList.genreSet?.databaseId) {
        const genreSet = await prisma.genreSet.findUniqueOrThrow({
          where: {
            databaseId: args.input.genreSetId,
          },
          include: { user: true },
        });
        if (genreSet.user.userId !== ctx.currentUserId) {
          throw new Error('権限がありません');
        }
        quizList.quizzes.forEach(async (quiz) => {
          await prisma.quiz.update({
            where: { databaseId: quiz.databaseId },
            data: {
              genre: {
                disconnect: true,
              },
            },
          });
        });
        await prisma.quizList.update({
          where: { databaseId: args.input?.databaseId ?? '' },
          data: {
            genreSet: {
              connect: {
                databaseId: args.input.genreSetId,
              },
            },
          },
        });
      }
      const ret = await prisma.quizList.update({
        where: { databaseId: args.input?.databaseId ?? '' },
        data: {
          name: args.input?.name ?? '',
          description: args.input?.description ?? '',
        },
      });
      return ret;
    },
  }),
}));