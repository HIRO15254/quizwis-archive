import { prisma } from '../../../lib/prisma';
import { builder } from '../builder';

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
      resolve: async (
        parent,
      ) => prisma.quiz.count({ where: { quizListId: parent.databaseId } }) ?? 0,
    }),
  }),
});
