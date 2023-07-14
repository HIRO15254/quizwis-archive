import { builder } from '../builder';

export const Genre = builder.prismaNode('Genre', {
  id: { field: 'id' },
  fields: (t) => ({
    genreSet: t.relation('genreSet'),

    name: t.exposeString('name', { nullable: true }),
    description: t.exposeString('description', { nullable: true }),
    ratio: t.exposeInt('ratio', { nullable: true }),

    parentGenre: t.relation('parentGenre', { nullable: true }),
    childGenres: t.relation('childGenres'),
    quizzes: t.relation('quizzes'),
  }),
});
