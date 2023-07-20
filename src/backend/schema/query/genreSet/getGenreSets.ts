import { prisma } from '../../../../lib/prisma';
import { checkAuthority } from '../../../util/checkAuthority';
import { builder } from '../../builder';
import { GenreSet } from '../../object/genreSet';

const GetGenreSetsInput = builder.inputType('GetGenreSetsInput', {
  fields: (t) => ({
    userDatabaseId: t.string(),
  }),
});

builder.queryField('getGenreSets', (t) => t.prismaField({
  type: [GenreSet],
  args: { input: t.arg({ type: GetGenreSetsInput }) },
  resolve: async (_query, _root, args, ctx, _info) => {
    let userId = ctx.currentUserId ?? '';
    if (args.input?.userDatabaseId) {
      if (!await checkAuthority(ctx.currentUserId ?? '', 'ADMIN')) {
        throw new Error('権限がありません。');
      }
      userId = args.input?.userDatabaseId;
    }
    const user = await prisma.user.findUniqueOrThrow({ where: { userId } });
    const genreSets = await prisma.genreSet.findMany({
      where: { user: { id: user?.id } },
      orderBy: { updatedAt: 'desc' },
    });
    return genreSets;
  },
}));
