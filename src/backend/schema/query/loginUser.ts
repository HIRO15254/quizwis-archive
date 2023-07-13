import { prisma } from '../../../lib/prisma';
import { builder } from '../builder';
import { User } from '../object/user';

builder.queryField('loginUser', (t) => t.prismaField({
  type: User,
  resolve: async (query, _root, _args, ctx, _info) => {
    const ret = await prisma.user.findUniqueOrThrow({
      ...query,
      where: { userId: ctx.currentUserId ?? '' },
    });
    return ret;
  },
}));
