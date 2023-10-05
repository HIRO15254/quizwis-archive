import { builder } from '../builder';

export const GenreSet = builder.prismaNode('GenreSet', {
  id: { field: 'databaseId' },
  fields: (t) => ({
    databaseId: t.exposeString('databaseId'),

    user: t.relation('user'),

    name: t.exposeString('name'),
    description: t.exposeString('description', { nullable: true }),

    genres: t.relation('genres'),

    quizLists: t.relation('quizLists'),

    createdAt: t.expose('createdAt', { type: 'Date' }),
    updatedAt: t.expose('updatedAt', { type: 'Date' }),
  }),
});
