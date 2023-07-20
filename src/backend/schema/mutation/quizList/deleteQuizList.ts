import { prisma } from '../../../../lib/prisma';
import { checkAuthority } from '../../../util/checkAuthority';
import { builder } from '../../builder';

const DeleteQuizListInput = builder.inputType('DeleteQuizListInput', {
  fields: (t) => ({
    databaseId: t.string({ required: true }),
  }),
});

builder.mutationFields((t) => ({
  deleteQuizList: t.prismaField({
    type: 'QuizList',
    args: {
      input: t.arg({ type: DeleteQuizListInput, required: true }),
    },
    resolve: async (_query, _root, args, ctx, _info) => {
      const quizList = await prisma.quizList.findUnique({
        where: { databaseId: args.input?.databaseId ?? '' },
        include: { user: true },
      });
      if (quizList?.user.userId !== ctx.currentUserId) {
        if (!await checkAuthority(ctx.currentUserId ?? '', 'ADMIN')) {
          throw new Error('権限がありません。');
        }
      }
      const ret = await prisma.quizList.delete({
        where: { databaseId: args.input?.databaseId ?? '' },
      });
      return ret;
    },
  }),
}));
