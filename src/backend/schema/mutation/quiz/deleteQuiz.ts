import { prisma } from '../../../../lib/prisma';
import { checkAuthority } from '../../../util/checkAuthority';
import { builder } from '../../builder';
import { Quiz } from '../../object/quiz';

const DeleteQuizInput = builder.inputType('DeleteQuizInput', {
  fields: (t) => ({
    quizDatabaseId: t.string({ required: true }),
  }),
});

builder.mutationFields((t) => ({
  deleteQuiz: t.prismaField({
    type: Quiz,
    args: {
      input: t.arg({ type: DeleteQuizInput, required: true }),
    },
    resolve: async (_query, _root, args, ctx, _info) => {
      const quiz = await prisma.quiz.findUniqueOrThrow({
        where: { databaseId: args.input?.quizDatabaseId ?? '' },
        include: { user: true },
      });
      if (quiz.user.userId !== ctx.currentUserId) {
        if (!await checkAuthority(ctx.currentUserId ?? '', 'ADMIN')) {
          throw new Error('権限がありません。');
        }
      }
      const ret = await prisma.quiz.delete({
        where: { databaseId: args.input?.quizDatabaseId ?? '' },
      });
      return ret;
    },
  }),
}));
