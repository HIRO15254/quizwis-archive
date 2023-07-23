import { builder } from '../builder';

export const GenreSet = builder.prismaNode('GenreSet', {
  id: { field: 'databaseId' },
  fields: (t) => ({
    databaseId: t.exposeString('databaseId'),
    genres: t.relation('genres'),
    user: t.relation('user'),

    name: t.exposeString('name'),
    description: t.exposeString('description'),

    quizLists: t.relation('quizLists'),
  }),
});
