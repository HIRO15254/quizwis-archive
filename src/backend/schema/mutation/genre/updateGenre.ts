import { decodeGlobalID } from '@pothos/plugin-relay';

import { prisma } from '../../../../lib/prisma';
import { checkAuthority } from '../../../util/checkAuthority';
import { builder } from '../../builder';
import { Genre } from '../../object/genre';

const UpdateGenreInput = builder.inputType('UpdateGenreInput', {
  fields: (t) => ({
    id: t.string({ required: true }),
    parentGenreId: t.string(),
    name: t.string({ required: true }),
    description: t.string({ required: true }),
    ratio: t.int({ required: true }),
    color: t.string({ required: true }),
  }),
});

builder.mutationFields((t) => ({
  updateGenre: t.prismaField({
    type: Genre,
    args: {
      input: t.arg({ type: UpdateGenreInput, required: true }),
    },
    resolve: async (
      _query,
      _root,
      args,
      ctx,
      _info,
    ) => {
      const { typename, id: databaseId } = decodeGlobalID(args.input.id);
      if (typename !== 'Genre') {
        throw new Error('idの型がGenreではありません。');
      }
      const genre = await prisma.genre.findUniqueOrThrow({
        where: { databaseId },
        include: { genreSet: { include: { user: true } } },
      });
      if (genre.genreSet.user.userId !== ctx.currentUserId) {
        if (!await checkAuthority(ctx.currentUserId, 'ADMIN')) {
          throw new Error('権限がありません。');
        }
      }
      let parentGenre;
      if (args.input.parentGenreId) {
        const {
          typename: parentGenreTypename,
          id: parentGenreDatabaseId,
        } = decodeGlobalID(args.input.parentGenreId);
        if (parentGenreTypename !== 'Genre') {
          throw new Error('parentGenreIdの型がGenreではありません。');
        }
        parentGenre = {
          connect: {
            databaseId: parentGenreDatabaseId,
          },
        };
      }
      return prisma.genre.update({
        where: { databaseId },
        data: {
          parentGenre,
          name: args.input.name,
          description: args.input.description,
          ratio: args.input.ratio,
          color: args.input.color,
        },
      });
    },
  }),
}));
