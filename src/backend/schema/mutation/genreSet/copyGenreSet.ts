import { prisma } from '../../../../lib/prisma';
import { checkAuthority } from '../../../util/checkAuthority';
import { builder } from '../../builder';
import { GenreSet } from '../../object/genreSet';

const CopyGenreSetInput = builder.inputType('CopyGenreSetInput', {
  fields: (t) => ({
    databaseId: t.string({ required: true }),
  }),
});

builder.mutationFields((t) => ({
  copyGenreSet: t.prismaField({
    type: GenreSet,
    args: {
      input: t.arg({ type: CopyGenreSetInput, required: true }),
    },
    resolve: async (_query, _root, args, ctx, _info) => {
      const genreSet = await prisma.genreSet.findUniqueOrThrow({
        where: { databaseId: args.input.databaseId },
        include: { user: true },
      });
      if (genreSet.user.userId !== ctx.currentUserId) {
        if (!await checkAuthority(ctx.currentUserId, 'ADMIN')) {
          throw new Error('権限がありません。');
        }
      }
      const ret = await prisma.genreSet.create({
        data: {
          name: genreSet.name,
          description: genreSet.description,
          user: {
            connect: {
              userId: ctx.currentUserId,
            },
          },
        },
      });
      const genres = await prisma.genre.findMany({
        where: { genreSetId: genreSet.databaseId },
      });
      genres.forEach(async (genre) => {
        await prisma.genre.create({
          data: {
            genreSet: {
              connect: {
                databaseId: ret.databaseId,
              },
            },
            name: genre.name,
            description: genre.description,
            ratio: genre.ratio,
            color: genre.color,
          },
        });
      });
      return ret;
    },
  }),
}));
