import { prisma } from '../../../lib/prisma';
import { builder } from '../builder';

const DeleteUserInput = builder.inputType('DeleteUserInput', {
  fields: (t) => ({
    userId: t.string({ required: true }),
  }),
});

builder.mutationFields((t) => ({
  deleteUser: t.prismaField({
    type: 'User',
    args: {
      input: t.arg({ type: DeleteUserInput, required: true }),
    },
    resolve: async (_query, _root, args, _ctx, _info) => {
      const ret = await prisma.user.delete({
        where: { userId: args.input?.userId ?? '' },
      });
      return ret;
    },
  }),
}));
