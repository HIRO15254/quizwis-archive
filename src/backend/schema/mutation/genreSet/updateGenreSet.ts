import { decodeGlobalID } from '@pothos/plugin-relay';

import { prisma } from '../../../../lib/prisma';
import { checkAuthority } from '../../../util/checkAuthority';
import { builder } from '../../builder';
import { GenreSet } from '../../object/genreSet';

const UpdateGenreSetInput = builder.inputType('UpdateGenreSetInput', {
  fields: (t) => ({
    id: t.string({ required: true }),
    name: t.string({ required: true }),
    description: t.string({ required: true }),
  }),
});

builder.mutationFields((t) => ({
  updateGenreSet: t.prismaField({
    type: GenreSet,
    args: {
      input: t.arg({ type: UpdateGenreSetInput, required: true }),
    },
    resolve: async (
      _query,
      _root,
      args,
      ctx,
      _info,
    ) => {
      const { typename, id: databaseId } = decodeGlobalID(args.input.id);
      if (typename !== 'GenreSet') {
        throw new Error('IDの型が違います。');
      }
      const genreSet = await prisma.genreSet.findUniqueOrThrow({
        where: { databaseId },
        include: { user: true },
      });
      if (genreSet.user.userId !== ctx.currentUserId) {
        if (!await checkAuthority(ctx.currentUserId, 'ADMIN')) {
          throw new Error('権限がありません。');
        }
      }
      return prisma.genreSet.update({
        where: { databaseId },
        data: {
          name: args.input.name,
          description: args.input.description,
        },
      });
    },
  }),
}));
