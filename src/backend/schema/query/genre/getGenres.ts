import { decodeGlobalID } from '@pothos/plugin-relay';

import { prisma } from '../../../../lib/prisma';
import { checkAuthority } from '../../../util/checkAuthority';
import { builder } from '../../builder';
import { Genre } from '../../object/genre';

const GetGenresInput = builder.inputType('GetGenresInput', {
  fields: (t) => ({
    genreSetId: t.string({ required: true }),
  }),
});

builder.queryField('getGenres', (t) => t.prismaField({
  type: [Genre],
  args: { input: t.arg({ type: GetGenresInput, required: true }) },
  resolve: async (
    _query,
    _root,
    args,
    ctx,
    _info,
  ) => {
    const { typename, id: databaseId } = decodeGlobalID(args.input.genreSetId);
    if (typename !== 'GenreSet') {
      throw new Error('GenreSetのIDの型が違います。');
    }
    const genreSet = await prisma.genreSet.findUniqueOrThrow({
      where: { databaseId },
      include: { user: true },
    });
    if (genreSet.user.userId !== ctx.currentUserId) {
      if (!await checkAuthority(ctx.currentUserId ?? '', 'ADMIN')) {
        throw new Error('権限がありません。');
      }
    }
    return prisma.genre.findMany({
      where: { genreSetId: args.input?.genreSetId ?? '' },
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        childGenres: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });
  },
}));
