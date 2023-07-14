import { prisma } from '../../../lib/prisma';
import { checkAuthority } from '../../util/checkAuthority';
import { builder } from '../builder';

const UpdateQuizListInput = builder.inputType('UpdateQuizListInput', {
  fields: (t) => ({
    databaseId: t.string({ required: true }),
    name: t.string({ required: true }),
    description: t.string(),
  }),
});

builder.mutationFields((t) => ({
  updateQuizList: t.prismaField({
    type: 'QuizList',
    args: {
      input: t.arg({ type: UpdateQuizListInput, required: true }),
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
