import { prisma } from '../../../../lib/prisma';
import { checkAuthority } from '../../../util/checkAuthority';
import { builder } from '../../builder';
import { Genre } from '../../object/genre';

const CreateGenreInput = builder.inputType('CreateGenreInput', {
  fields: (t) => ({
    genreSetDatabaseId: t.string({ required: true }),
    parentGenreDatabaseId: t.string(),
    name: t.string({ required: true }),
    description: t.string(),
    ratio: t.int({ defaultValue: 1 }),
    color: t.string(),
  }),
});

builder.mutationFields((t) => ({
  createGenre: t.prismaField({
    type: Genre,
    args: {
      input: t.arg({ type: CreateGenreInput, required: true }),
    },
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
      if (args.input?.parentGenreDatabaseId) {
        const ret = await prisma.genre.create({
          data: {
            genreSet: {
              connect: {
                databaseId: args.input?.genreSetDatabaseId ?? '',
              },
            },
            parentGenre: {
              connect: {
                databaseId: args.input?.parentGenreDatabaseId ?? '',
              },
            },
            name: args.input?.name,
            description: args.input?.description ?? undefined,
            ratio: args.input?.ratio ?? undefined,
            color: args.input?.color ?? undefined,
          },
        });
        return ret;
      }
      const ret = await prisma.genre.create({
        data: {
          genreSet: {
            connect: {
              databaseId: args.input?.genreSetDatabaseId ?? '',
            },
          },
          name: args.input?.name,
          description: args.input?.description ?? undefined,
          ratio: args.input?.ratio ?? undefined,
          color: args.input?.color ?? undefined,
        },
      });
      return ret;
    },
  }),
}));
