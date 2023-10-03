import { decodeGlobalID } from '@pothos/plugin-relay';

import { prisma } from '../../../../lib/prisma';
import { checkAuthority } from '../../../util/checkAuthority';
import { builder } from '../../builder';

const UpdateQuizListInput = builder.inputType('UpdateQuizListInput', {
  fields: (t) => ({
    id: t.string({ required: true }),
    name: t.string({ required: true }),
    description: t.string({ required: true }),
    genreSetId: t.string(),
    goal: t.int({ required: true }),
  }),
});

builder.mutationFields((t) => ({
  updateQuizList: t.prismaField({
    type: 'QuizList',
    args: {
      input: t.arg({ type: UpdateQuizListInput, required: true }),
    },
    resolve: async (
      _query,
      _root,
      args,
      ctx,
      _info,
    ) => {
      const { typename, id: databaseId } = decodeGlobalID(args.input.id);
      if (typename !== 'QuizList') {
        throw new Error('不正なIDです');
      }
      const quizList = await prisma.quizList.findUniqueOrThrow({
        where: { databaseId },
        include: { user: true, genreSet: true, quizzes: true },
      });
      if (quizList?.user.userId !== ctx.currentUserId) {
        if (!await checkAuthority(ctx.currentUserId, 'ADMIN')) {
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
        await Promise.all(quizList.quizzes.map(async (quiz) => {
          await prisma.quiz.update({
            where: { databaseId: quiz.databaseId },
            data: {
              genre: {
                disconnect: true,
              },
            },
          });
        }));
        await prisma.quizList.update({
          where: { databaseId },
          data: {
            genreSet: {
              connect: {
                databaseId: args.input.genreSetId,
              },
            },
          },
        });
      }
      return prisma.quizList.update({
        where: { databaseId },
        data: {
          name: args.input.name,
          description: args.input.description,
          goal: args.input.goal,
        },
      });
    },
  }),
}));
