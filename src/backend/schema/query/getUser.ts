import { prisma } from '../../../lib/prisma';
import { builder } from '../builder';
import { User } from '../object/user';

const GetUserInput = builder.inputType('GetUserInput', {
  fields: (t) => ({
    userId: t.string({ required: true }),
  }),
});

builder.queryField('getUser', (t) => t.prismaField({
  type: User,
  args: { input: t.arg({ type: GetUserInput, required: true }) },
  resolve: async (query, _root, args, _ctx, _info) => {
    const ret = await prisma.user.findUniqueOrThrow({
      ...query,
      where: { userId: args.input?.userId ?? '' },
    });
    return ret;
  },
}));
