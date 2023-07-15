import { prisma } from '../../../../lib/prisma';
import { checkAuthority } from '../../../util/checkAuthority';
import { builder } from '../../builder';
import { Quiz } from '../../object/quiz';

const GetQuizInput = builder.inputType('GetQuizListInput', {
  fields: (t) => ({
    databaseId: t.string(),
  }),
});

builder.queryField('getQuiz', (t) => t.prismaField({
  type: Quiz,
  args: { input: t.arg({ type: GetQuizInput }) },
  resolve: async (_query, _root, args, ctx, _info) => {
    const quiz = await prisma.quiz.findUniqueOrThrow({
      where: { databaseId: args.input?.databaseId ?? '' },
      include: { quizList: { include: { user: true } } },
    });
    if (quiz.quizList.user.userId !== ctx.currentUserId) {
      if (!await checkAuthority(ctx.currentUserId ?? '', 'ADMIN')) {
        throw new Error('権限がありません。');
      }
    }
    return quiz;
  },
}));
