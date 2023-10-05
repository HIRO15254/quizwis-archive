import { prisma } from '../../../lib/prisma';
import { builder } from '../builder';
import { QuizFilterInput } from '../query/quiz';

export const QuizList = builder.prismaNode('QuizList', {
  id: { field: 'databaseId' },
  fields: (t) => ({
    databaseId: t.exposeString('databaseId'),

    user: t.relation('user'),

    name: t.exposeString('name'),
    description: t.exposeString('description', { nullable: true }),
    goal: t.exposeInt('goal', { nullable: true }),

    genreSet: t.relation('genreSet', { nullable: true }),
    quizzes: t.relation('quizzes'),
    quizCount: t.field({
      type: 'Int',
      args: {
        filter: t.arg({ type: QuizFilterInput }),
      },
      resolve: async (
        parent,
        args,
      ) => {
        const { filter } = args;
        return prisma.quiz.count({
          where: {
            quizListId: parent.databaseId,
            genreId: filter?.genreId ? {
              equals: filter.genreId,
            } : undefined,
          },
        }) ?? 0;
      },
    }),
  }),
});
