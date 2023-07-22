import { prisma } from '../../../../lib/prisma';
import { checkAuthority } from '../../../util/checkAuthority';
import { builder } from '../../builder';
import { Quiz } from '../../object/quiz';

const GetQuizzesInput = builder.inputType('GetQuizzesInput', {
  fields: (t) => ({
    quizListDatabaseId: t.string(),
    take: t.int({ required: true, defaultValue: 10 }),
    cursorDatabaseId: t.string(),
    page: t.int({ required: true, defaultValue: 1 }),
  }),
});

builder.queryField('getQuizzes', (t) => t.prismaField({
  type: [Quiz],
  args: { input: t.arg({ type: GetQuizzesInput, required: true }) },
  resolve: async (_query, _root, args, ctx, _info) => {
    if (args.input?.quizListDatabaseId) {
      const { cursorDatabaseId: cursor } = args.input;
      const quizList = await prisma.quizList.findUniqueOrThrow({
        where: { databaseId: args.input.quizListDatabaseId },
        include: { user: true },
      });
      if (quizList.user.userId !== ctx.currentUserId) {
        if (!checkAuthority(ctx.currentUserId, 'ADMIN')) {
          throw new Error('権限がありません。');
        }
      }
      const quizzes = await prisma.quiz.findMany({
        where: { quizlistId: args.input.quizListDatabaseId },
        orderBy: { createdAt: 'desc' },
        take: args.input.take,
        cursor: cursor ? { databaseId: cursor } : undefined,
        skip: !cursor ? args.input.take * (args.input.page - 1) : undefined,
      });
      return quizzes;
    }
    throw new Error('クイズリストIDが定義されていません。');
  },
}));
