import { prisma } from '../../../lib/prisma';
import { builder } from '../builder';

const UpdateLoginUserInput = builder.inputType('UpdateLoginUserInput', {
  fields: (t) => ({
    newUserId: t.string({ required: false }),
    name: t.string({ required: false }),
    email: t.string({ required: false }),
    image: t.string({ required: false }),
  }),
});

builder.mutationFields((t) => ({
  updateLoginUser: t.prismaField({
    type: 'User',
    args: {
      input: t.arg({ type: UpdateLoginUserInput, required: true }),
    },
    resolve: async (_query, _root, args, ctx, _info) => {
      const ret = await prisma.user.update({
        where: { userId: ctx.currentUserId ?? '' },
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
