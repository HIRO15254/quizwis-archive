import { prisma } from '../../../../lib/prisma';
import { checkAuthority } from '../../../util/checkAuthority';
import { builder } from '../../builder';
import { QuizList } from '../../object/quizList';

const GetQuizListInput = builder.inputType('GetQuizListInput', {
  fields: (t) => ({
    databaseId: t.string(),
  }),
});

builder.queryField('getQuizList', (t) => t.prismaField({
  type: QuizList,
  args: { input: t.arg({ type: GetQuizListInput }) },
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
    const ret = await prisma.quizList.findUniqueOrThrow({
      where: { databaseId: args.input?.databaseId ?? '' },
    });
    return ret;
  },
}));
