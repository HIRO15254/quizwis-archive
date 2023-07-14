import { builder } from '../builder';

export const QuizList = builder.prismaNode('QuizList', {
  id: { field: 'id' },
  fields: (t) => ({
    user: t.relation('user'),

    name: t.exposeString('name'),
    description: t.exposeString('description', { nullable: true }),

    genreSet: t.relation('genreSet'),
    quizzes: t.relation('quizzes'),
  }),
});
