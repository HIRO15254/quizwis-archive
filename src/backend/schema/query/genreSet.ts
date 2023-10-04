import { prisma } from '../../../lib/prisma';
import { checkId } from '../../util/checkId';
import { builder } from '../builder';
import { GenreSet } from '../object/genreSet';

const GetGenreSetInput = builder.inputType('GetGenreSetInput', {
  fields: (t) => ({
    id: t.string({ required: true }),
  }),
});

const GetGenreSetsInput = builder.inputType('GetGenreSetsInput', {
  fields: (t) => ({
    userId: t.string({ required: true }),
  }),
});

builder.queryFields((t) => ({
  getGenreSet: t.prismaField({
    type: GenreSet,
    args: { input: t.arg({ type: GetGenreSetInput, required: true }) },
    resolve: async (
      _query,
      _root,
      args,
      ctx,
      _info,
    ) => {
      const { id } = args.input;
      const { databaseId } = await checkId({
        userId: ctx.currentUserId,
        targetId: id,
        expectedTypeName: 'GenreSet',
      });
      return prisma.genreSet.findUniqueOrThrow({
        where: { databaseId },
        include: {
          genres: {
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
          },
        },
      });
    },
  }),
  getGenreSets: t.prismaField({
    type: [GenreSet],
    args: { input: t.arg({ type: GetGenreSetsInput }) },
    resolve: async (_query, _root, args, ctx, _info) => {
      const userId = args.input?.userId;
      const { databaseId: userDatabaseId } = await checkId({
        userId: ctx.currentUserId,
        targetId: userId,
        expectedTypeName: 'User',
      });
      return prisma.genreSet.findMany({
        where: { user: { id: userDatabaseId ?? ctx.currentUserId } },
        orderBy: { updatedAt: 'desc' },
      });
    },
  }),
}));
