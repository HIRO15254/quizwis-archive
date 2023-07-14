import { builder } from '../builder';

export const GenreSet = builder.prismaNode('GenreSet', {
  id: { field: 'id' },
  fields: (t) => ({
    genres: t.relation('genres'),
    user: t.relation('user'),

    name: t.exposeString('name', { nullable: true }),
    description: t.exposeString('description', { nullable: true }),

    quizLists: t.relation('quizLists'),
  }),
});
