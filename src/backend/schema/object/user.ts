import { builder } from '../builder';
import { UserRoleEnum } from '../enum/userRole';

export const User = builder.prismaNode('User', {
  id: { field: 'id' },
  fields: (t) => ({
    name: t.exposeString('name', { nullable: true }),
    userId: t.exposeString('userId', { nullable: true }),
    email: t.exposeString('trueEmail', { nullable: true }),
    image: t.exposeString('image', { nullable: true }),
    role: t.expose('role', { type: UserRoleEnum }),
  }),
});
