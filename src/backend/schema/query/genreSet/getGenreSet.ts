import { prisma } from '../../../../lib/prisma';
import { checkAuthority } from '../../../util/checkAuthority';
import { builder } from '../../builder';
import { GenreSet } from '../../object/genreSet';

const GetGenreSetInput = builder.inputType('GetGenreSetInput', {
  fields: (t) => ({
    databaseId: t.string(),
  }),
});

builder.queryField('getGenreSet', (t) => t.prismaField({
  type: GenreSet,
  args: { input: t.arg({ type: GetGenreSetInput }) },
  resolve: async (_query, _root, args, ctx, _info) => {
    const genreSet = await prisma.genreSet.findUniqueOrThrow({
      where: { databaseId: args.input?.databaseId ?? '' },
      include: { user: true },
    });
    if (genreSet.user.userId !== ctx.currentUserId) {
      if (!await checkAuthority(ctx.currentUserId ?? '', 'ADMIN')) {
        throw new Error('権限がありません。');
      }
    }
    return genreSet;
  },
}));
