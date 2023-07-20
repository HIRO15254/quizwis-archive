import { prisma } from '../../../../lib/prisma';
import { checkAuthority } from '../../../util/checkAuthority';
import { builder } from '../../builder';
import { Quiz } from '../../object/quiz';

const GetQuizzesInput = builder.inputType('GetQuizzesInput', {
  fields: (t) => ({
    quizListDatabaseId: t.string(),
  }),
});

builder.queryField('getQuizzes', (t) => t.prismaField({
  type: [Quiz],
  args: { input: t.arg({ type: GetQuizzesInput, required: true }) },
  resolve: async (_query, _root, args, ctx, _info) => {
    if (args.input?.quizListDatabaseId) {
      const quizList = await prisma.quizList.findUniqueOrThrow({
        where: { databaseId: args.input.quizListDatabaseId },
        include: { user: true, quizzes: true },
      });
      if (await checkAuthority(ctx.currentUserId ?? '', 'ADMIN') || quizList.user.userId === ctx.currentUserId) {
        return quizList.quizzes;
      }
      throw new Error('権限がありません。');
    } else {
      throw new Error('クイズリストIDが定義されていません。');
    }
  },
}));
