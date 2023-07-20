import { prisma } from '../../../../lib/prisma';
import { checkAuthority } from '../../../util/checkAuthority';
import { builder } from '../../builder';
import { Genre } from '../../object/genre';

const UpdateGenreInput = builder.inputType('UpdateGenreInput', {
  fields: (t) => ({
    databaseId: t.string({ required: true }),
    parentGenreDatabaseId: t.string(),
    name: t.string(),
    description: t.string(),
    ratio: t.int(),
  }),
});

builder.mutationFields((t) => ({
  updateGenre: t.prismaField({
    type: Genre,
    args: {
      input: t.arg({ type: UpdateGenreInput, required: true }),
    },
    resolve: async (_query, _root, args, ctx, _info) => {
      const genre = await prisma.genre.findUniqueOrThrow({
        where: { databaseId: args.input?.databaseId ?? '' },
        include: { genreSet: { include: { user: true } } },
      });
      if (genre.genreSet.user.userId !== ctx.currentUserId) {
        if (!await checkAuthority(ctx.currentUserId ?? '', 'ADMIN')) {
          throw new Error('権限がありません。');
        }
      }
      if (args.input?.parentGenreDatabaseId) {
        prisma.genre.update({
          where: { databaseId: args.input?.databaseId ?? '' },
          data: {
            parentGenre: {
              connect: {
                databaseId: args.input?.parentGenreDatabaseId ?? '',
              },
            },
          },
        });
      }
      const ret = await prisma.genre.update({
        where: { databaseId: args.input?.databaseId ?? '' },
        data: {
          name: args.input?.name ?? undefined,
          description: args.input?.description ?? '',
          ratio: args.input?.ratio,
        },
      });
      return ret;
    },
  }),
}));
