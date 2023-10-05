import { builder } from '../builder';
import { UserRoleEnum } from '../enum/userRole';

export const User = builder.prismaNode('User', {
  id: { field: 'id' },
  fields: (t) => ({
    databaseId: t.exposeString('id'),
    name: t.exposeString('name', { nullable: true }),
    userId: t.exposeString('userId', { nullable: true }),
    email: t.exposeString('trueEmail', { nullable: true }),
    image: t.exposeString('image', { nullable: true }),
    role: t.expose('role', { type: UserRoleEnum }),

    quizzes: t.relation('quizzes'),
    quizLists: t.relation('quizLists'),
    genreSets: t.relation('genreSets'),

    createdAt: t.expose('createdAt', { type: 'Date' }),
    updatedAt: t.expose('updatedAt', { type: 'Date' }),
  }),
});
