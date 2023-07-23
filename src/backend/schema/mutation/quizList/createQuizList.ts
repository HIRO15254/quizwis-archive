import { prisma } from '../../../../lib/prisma';
import { builder } from '../../builder';

const CreateQuizListInput = builder.inputType('CreateQuizListInput', {
  fields: (t) => ({
    name: t.string({ required: true }),
    description: t.string({ required: true }),
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
      if (args.input.genreSetId) {
        const genreSet = await prisma.genreSet.findUniqueOrThrow({
          where: {
            databaseId: args.input.genreSetId,
          },
          include: { user: true },
        });
        if (genreSet.user.userId !== ctx.currentUserId) {
          throw new Error('権限がありません');
        }
        const ret = await prisma.quizList.create({
          data: {
            user: {
              connect: {
                userId: ctx.currentUserId,
              },
            },
            name: args.input.name,
            description: args.input.description,
            genreSet: {
              connect: {
                databaseId: args.input.genreSetId,
              },
            },
          },
        });
        return ret;
      }
      const ret = await prisma.quizList.create({
        data: {
          user: {
            connect: {
              userId: ctx.currentUserId,
            },
          },
          name: args.input.name,
          description: args.input.description,
        },
      });
      return ret;
    },
  }),
}));
