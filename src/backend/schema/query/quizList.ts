import { prisma } from '../../../lib/prisma';
import { checkId } from '../../util/checkId';
import { builder } from '../builder';
import { QuizList } from '../object/quizList';

const GetQuizListInput = builder.inputType('GetQuizListInput', {
  fields: (t) => ({
    id: t.string({ required: true }),
  }),
});

builder.queryFields((t) => ({
  getQuizList: t.prismaField({
    type: QuizList,
    args: { input: t.arg({ type: GetQuizListInput, required: true }) },
    resolve: async (
      _query,
      _root,
      args,
      ctx,
      _info,
    ) => {
      const { id } = args.input;
      const { databaseId } = await checkId({
        userId: ctx.currentUserId,
        targetId: id,
        expectedTypeName: 'QuizList',
      });
      return prisma.quizList.findUniqueOrThrow({
        where: { databaseId },
      });
    },
  }),
  getQuizLists: t.prismaField({
    type: [QuizList],
    resolve: async (
      _query,
      _root,
      _args,
      ctx,
      _info,
    ) => prisma.quizList.findMany({
      where: {
        user: {
          userId: ctx.currentUserId,
        },
      },
      orderBy: { updatedAt: 'desc' },
    }),
  }),
}));
