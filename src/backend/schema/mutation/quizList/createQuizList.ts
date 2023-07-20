import { prisma } from '../../../../lib/prisma';
import { builder } from '../../builder';

const CreateQuizListInput = builder.inputType('CreateQuizListInput', {
  fields: (t) => ({
    name: t.string({ required: true }),
    description: t.string(),
    genreSetId: t.string(),
  }),
});

builder.mutationFields((t) => ({
  createQuizList: t.prismaField({
    type: 'QuizList',
    args: {
      input: t.arg({ type: CreateQuizListInput, required: true }),
    },
    resolve: async (_query, _root, args, ctx, _info) => {
      const ret = await prisma.quizList.create({
        data: {
          user: {
            connect: {
              userId: ctx.currentUserId ?? '',
            },
          },
          name: args.input?.name ?? '',
          description: args.input?.description ?? '',
        },
      });
      return ret;
    },
  }),
}));
