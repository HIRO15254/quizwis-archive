import { builder } from '../builder';

export const Quiz = builder.prismaNode('Quiz', {
  id: { field: 'databaseId' },
  fields: (t) => ({
    databaseId: t.exposeString('databaseId'),
    quizList: t.relation('quizList'),
    user: t.relation('user'),

    question: t.exposeString('question'),
    answer: t.exposeString('answer'),
    explanation: t.exposeString('explanation'),
    otherAnswer: t.exposeString('otherAnswer'),
    source: t.exposeString('source'),
    genre: t.relation('genre', { nullable: true }),
  }),
});
