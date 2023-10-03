import { builder } from '../builder';

export const Genre = builder.prismaNode('Genre', {
  id: { field: 'databaseId' },
  fields: (t) => ({
    databaseId: t.exposeString('databaseId'),
    genreSet: t.relation('genreSet'),

    name: t.exposeString('name'),
    description: t.exposeString('description'),
    color: t.exposeString('color'),
    ratio: t.exposeInt('ratio'),

    parentGenre: t.relation('parentGenre'),
    childGenres: t.relation('childGenres'),
    quizzes: t.relation('quizzes'),

    createdAt: t.expose('createdAt', { type: 'Date' }),
    updatedAt: t.expose('updatedAt', { type: 'Date' }),
  }),
});
