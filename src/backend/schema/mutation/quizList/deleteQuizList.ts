import { decodeGlobalID } from '@pothos/plugin-relay';

import { prisma } from '../../../../lib/prisma';
import { checkAuthority } from '../../../util/checkAuthority';
import { builder } from '../../builder';

const DeleteQuizListInput = builder.inputType('DeleteQuizListInput', {
  fields: (t) => ({
    id: t.string({ required: true }),
  }),
});

builder.mutationFields((t) => ({
  deleteQuizList: t.prismaField({
    type: 'QuizList',
    args: {
      input: t.arg({ type: DeleteQuizListInput, required: true }),
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
      const quizList = await prisma.quizList.findUnique({
        where: { databaseId },
        include: { user: true },
      });
      if (quizList?.user.userId !== ctx.currentUserId) {
        if (!await checkAuthority(ctx.currentUserId, 'ADMIN')) {
          throw new Error('権限がありません。');
        }
      }
      return prisma.quizList.delete({
        where: { databaseId },
      });
    },
  }),
}));
