import { checkAuthority } from 'backend/util/checkAuthority';

import { prisma } from '../../../../lib/prisma';
import { builder } from '../../builder';
import { GenreSet } from '../../object/genreSet';

const DeleteGenreSetInput = builder.inputType('DeleteGenreSetInput', {
  fields: (t) => ({
    databaseId: t.string({ required: true }),
  }),
});

builder.mutationFields((t) => ({
  deleteGenreSet: t.prismaField({
    type: GenreSet,
    args: {
      input: t.arg({ type: DeleteGenreSetInput, required: true }),
    },
    resolve: async (_query, _root, args, ctx, _info) => {
      const genreSet = await prisma.genreSet.findUniqueOrThrow({
        where: { databaseId: args.input?.databaseId ?? '' },
        include: { user: true },
      });
      if (genreSet.user.userId !== ctx.currentUserId) {
        if (!await checkAuthority(ctx.currentUserId ?? '', 'ADMIN')) {
          throw new Error('権限がありません。');
        }
      }
      const ret = await prisma.genreSet.delete({
        where: { databaseId: args.input?.databaseId ?? '' },
      });
      return ret;
    },
  }),
}));
