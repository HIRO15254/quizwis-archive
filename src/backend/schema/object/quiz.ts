import { builder } from '../builder';

export const Quiz = builder.prismaNode('Quiz', {
  id: { field: 'id' },
  fields: (t) => ({
    quizList: t.relation('quizList'),
    user: t.relation('user'),

    question: t.exposeString('question', { nullable: true }),
    answer: t.exposeString('answer', { nullable: true }),
    explanation: t.exposeString('explanation', { nullable: true }),
    genre: t.relation('genre'),
  }),
});
