import { prisma } from '../../../lib/prisma';
import { checkId } from '../../util/checkId';
import { builder } from '../builder';
import { Genre } from '../object/genre';

const GetGenreInput = builder.inputType('GetGenreInput', {
  fields: (t) => ({
    id: t.string({ required: true }),
  }),
});

builder.queryFields((t) => ({
  getGenre: t.prismaField({
    type: Genre,
    args: { input: t.arg({ type: GetGenreInput, required: true }) },
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
        expectedTypeName: 'Genre',
      });
      return prisma.genre.findUniqueOrThrow({
        where: { databaseId },
      });
    },
  }),
}));
