import { prisma } from '../../../../lib/prisma';
import { checkAuthority } from '../../../util/checkAuthority';
import { nullToEmpty } from '../../../util/nullToEmpty';
import { builder } from '../../builder';
import { GenreSet } from '../../object/genreSet';

const UpdateGenreSetInput = builder.inputType('UpdateGenreSetInput', {
  fields: (t) => ({
    databaseId: t.string({ required: true }),
    name: t.string(),
    description: t.string(),
  }),
});

builder.mutationFields((t) => ({
  updateGenreSet: t.prismaField({
    type: GenreSet,
    args: {
      input: t.arg({ type: UpdateGenreSetInput, required: true }),
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
      const ret = await prisma.genreSet.update({
        where: { databaseId: args.input.databaseId },
        data: {
          name: args.input.name ?? undefined,
          description: nullToEmpty(args.input.description),
        },
      });
      return ret;
    },
  }),
}));
