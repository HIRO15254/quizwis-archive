import { decodeGlobalID } from '@pothos/plugin-relay';

import { prisma } from '../../../../lib/prisma';
import { checkAuthority } from '../../../util/checkAuthority';
import { builder } from '../../builder';
import { Genre } from '../../object/genre';

const GetChildGenresInput = builder.inputType('GetChildGenresInput', {
  fields: (t) => ({
    parentId: t.string({ required: true }),
  }),
});

builder.queryField('getChildGenres', (t) => t.prismaField({
  type: [Genre],
  args: { input: t.arg({ type: GetChildGenresInput, required: true }) },
  resolve: async (
    _query,
    _root,
    args,
    ctx,
    _info,
  ) => {
    const { typename, id: ParentDatabaseId } = decodeGlobalID(args.input.parentId);
    if (typename !== 'GenreSet' && typename !== 'Genre') {
      throw new Error('parentIdのIDの型が違います。');
    }
    let parentGenreDatabaseId: string | undefined;
    let genreSetDatabaseId: string | undefined;
    if (typename === 'Genre') {
      parentGenreDatabaseId = ParentDatabaseId;
      const genre = await prisma.genre.findUniqueOrThrow({
        where: { databaseId: ParentDatabaseId },
        include: { genreSet: { include: { user: true } } },
      });
      if (genre.genreSet.user.userId !== ctx.currentUserId) {
        if (!await checkAuthority(ctx.currentUserId ?? '', 'ADMIN')) {
          throw new Error('権限がありません。');
        }
      }
      genreSetDatabaseId = genre.genreSet.databaseId;
    }
    if (typename === 'GenreSet') {
      const genreSet = await prisma.genreSet.findUniqueOrThrow({
        where: { databaseId: ParentDatabaseId },
        include: { user: true },
      });
      if (genreSet.user.userId !== ctx.currentUserId) {
        if (!await checkAuthority(ctx.currentUserId ?? '', 'ADMIN')) {
          throw new Error('権限がありません。');
        }
      }
      genreSetDatabaseId = ParentDatabaseId;
    }
    const genres = await prisma.genre.findMany({
      where: {
        genreSetId: genreSetDatabaseId,
      },
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        childGenres: {
          orderBy: {
            createdAt: 'asc',
          },
        },
        parentGenre: true,
      },
    });
    return genres.filter(
      (genre) => genre.parentGenre?.databaseId === parentGenreDatabaseId,
    );
  },
}));
