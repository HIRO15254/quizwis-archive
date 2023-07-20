import { builder } from '../builder';

export const Quiz = builder.prismaNode('Quiz', {
  id: { field: 'databaseId' },
  fields: (t) => ({
    databaseId: t.exposeString('databaseId'),
    quizList: t.relation('quizList'),
    user: t.relation('user'),

    question: t.exposeString('question', { nullable: true }),
    answer: t.exposeString('answer', { nullable: true }),
    explanation: t.exposeString('explanation', { nullable: true }),
    otherAnswer: t.exposeString('otherAnswer', { nullable: true }),
    source: t.exposeString('source', { nullable: true }),
    genre: t.relation('genre'),
  }),
});
