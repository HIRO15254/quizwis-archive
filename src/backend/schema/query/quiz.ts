import { prisma } from '../../../lib/prisma';
import { checkId } from '../../util/checkId';
import { builder } from '../builder';
import { Quiz } from '../object/quiz';

const GetQuizInput = builder.inputType('GetQuizInput', {
  fields: (t) => ({
    id: t.string({ required: true }),
  }),
});

builder.queryFields((t) => ({
  getQuiz: t.prismaField({
    type: Quiz,
    args: { input: t.arg({ type: GetQuizInput, required: true }) },
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
        expectedTypeName: 'Quiz',
      });
      return prisma.quiz.findUniqueOrThrow({
        where: { databaseId },
      });
    },
  }),
}));
