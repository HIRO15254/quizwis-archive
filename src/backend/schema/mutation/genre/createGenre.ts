import { decodeGlobalID } from '@pothos/plugin-relay';

import { prisma } from '../../../../lib/prisma';
import { checkAuthority } from '../../../util/checkAuthority';
import { builder } from '../../builder';
import { Genre } from '../../object/genre';

const CreateGenreInput = builder.inputType('CreateGenreInput', {
  fields: (t) => ({
    genreSetId: t.string({ required: true }),
    parentGenreId: t.string(),
    name: t.string({ required: true }),
    description: t.string({ required: true }),
    ratio: t.int({ required: true }),
    color: t.string({ required: true }),
  }),
});

builder.mutationFields((t) => ({
  createGenre: t.prismaField({
    type: Genre,
    args: {
      input: t.arg({ type: CreateGenreInput, required: true }),
    },
    resolve: async (
      _query,
      _root,
      args,
      ctx,
      _info,
    ) => {
      const {
        typename: genreSetType,
        id: genreSetDatabaseId,
      } = decodeGlobalID(args.input.genreSetId);
      if (genreSetType !== 'GenreSet') {
        throw new Error('GenreSetのIDの型が違います。');
      }
      const genreSet = await prisma.genreSet.findUniqueOrThrow({
        where: { databaseId: genreSetDatabaseId },
        include: { user: true },
      });
      if (genreSet.user.userId !== ctx.currentUserId) {
        if (!await checkAuthority(ctx.currentUserId, 'ADMIN')) {
          throw new Error('権限がありません。');
        }
      }
      let parentGenre;
      // 親ジャンルが指定されている場合
      if (args.input.parentGenreId) {
        const {
          typename: parentGenreType,
          id: parentGenreDatabaseId,
        } = decodeGlobalID(args.input.parentGenreId);
        if (parentGenreType !== 'Genre') {
          throw new Error('ParentGenreのIDの型が違います。');
        }
        parentGenre = {
          connect: {
            databaseId: parentGenreDatabaseId,
          },
        };
      }
      // ジャンルを実際に作る
      return prisma.genre.create({
        data: {
          genreSet: {
            connect: {
              databaseId: genreSetDatabaseId,
            },
          },
          parentGenre,
          name: args.input.name,
          description: args.input.description,
          ratio: args.input.ratio,
          color: args.input.color,
        },
      });
    },
  }),
}));
