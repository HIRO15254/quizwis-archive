import { prisma } from '../../../../lib/prisma';
import { checkAuthority } from '../../../util/checkAuthority';
import { builder } from '../../builder';
import { Genre } from '../../object/genre';

const GetGenresInput = builder.inputType('GetGenresInput', {
  fields: (t) => ({
    genreSetDatabaseId: t.string(),
  }),
});

builder.queryField('getGenres', (t) => t.prismaField({
  type: [Genre],
  args: { input: t.arg({ type: GetGenresInput }) },
  resolve: async (_query, _root, args, ctx, _info) => {
    const genreSet = await prisma.genreSet.findUniqueOrThrow({
      where: { databaseId: args.input?.genreSetDatabaseId ?? '' },
      include: { user: true },
    });
    if (genreSet.user.userId !== ctx.currentUserId) {
      if (!await checkAuthority(ctx.currentUserId ?? '', 'ADMIN')) {
        throw new Error('権限がありません。');
      }
    }
    const ret = await prisma.genre.findMany({
      where: { genreSetId: args.input?.genreSetDatabaseId ?? '' },
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
    return ret;
  },
}));
