import { prisma } from '../../../../lib/prisma';
import { checkAuthority } from '../../../util/checkAuthority';
import { builder } from '../../builder';
import { QuizList } from '../../object/quizList';

const GetQuizListsInput = builder.inputType('GetQuizListsInput', {
  fields: (t) => ({
    userId: t.string(),
  }),
});

builder.queryField('getQuizLists', (t) => t.prismaField({
  type: [QuizList],
  args: { input: t.arg({ type: GetQuizListsInput }) },
  resolve: async (query, _root, args, ctx, _info) => {
    let userId = ctx.currentUserId ?? '';
    if (args.input?.userId) {
      if (await checkAuthority(ctx.currentUserId ?? '', 'ADMIN')) {
        userId = args.input?.userId;
      } else {
        throw new Error('ユーザーIDが定義されていますが、ADMIN権限がありません。');
      }
    }
    const user = await prisma.user.findUniqueOrThrow({ where: { userId } });
    const ret = await prisma.quizList.findMany({
      ...query,
      where: { user: { id: user?.id } },
      orderBy: { updatedAt: 'desc' },
    });
    return ret;
  },
}));
