import { builder } from '../builder';

export const Quiz = builder.prismaNode('Quiz', {
  id: { field: 'databaseId' },
  fields: (t) => ({
    databaseId: t.exposeString('databaseId'),

    user: t.relation('user'),
    quizList: t.relation('quizList'),

    question: t.exposeString('question', { nullable: true }),
    answer: t.exposeString('answer', { nullable: true }),
    explanation: t.exposeString('explanation', { nullable: true }),
    otherAnswer: t.exposeString('otherAnswer', { nullable: true }),
    source: t.exposeString('source', { nullable: true }),
    length: t.exposeInt('length'),

    genre: t.relation('genre'),

    createdAt: t.expose('createdAt', { type: 'Date' }),
    updatedAt: t.expose('updatedAt', { type: 'Date' }),
  }),
});
