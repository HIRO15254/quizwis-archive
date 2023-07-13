import { prisma } from '../../../lib/prisma';
import { builder } from '../builder';

const UpdateUserInput = builder.inputType('UpdateUserInput', {
  fields: (t) => ({
    userId: t.string({ required: true }),
    newUserId: t.string({ required: false }),
    name: t.string({ required: false }),
    email: t.string({ required: false }),
    image: t.string({ required: false }),
  }),
});

builder.mutationFields((t) => ({
  updateUser: t.prismaField({
    type: 'User',
    args: {
      input: t.arg({ type: UpdateUserInput, required: true }),
    },
    resolve: (_query, _root, args, _ctx, _info) => {
      const ret = prisma.user.update({
        where: { userId: args.input?.userId ?? '' },
        data: {
          userId: args.input?.newUserId,
          name: args.input?.name,
          trueEmail: args.input?.email,
          image: args.input?.image,
        },
      });
      return ret;
    },
  }),
}));
