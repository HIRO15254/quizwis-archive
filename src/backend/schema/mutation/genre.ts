import { prisma } from '../../../lib/prisma';
import { checkId } from '../../util/checkId';
import { databaseIdToConnect } from '../../util/databaseIdToConnect';
import { builder } from '../builder';
import { Genre } from '../object/genre';

const GenreInputData = builder.inputType('GenreInputData', {
  fields: (t) => ({
    name: t.string({ required: true }),
    description: t.string(),
    ratio: t.int({ required: true }),
    color: t.string({ required: true }),
  }),
});

const CreateGenreInput = builder.inputType('CreateGenreInput', {
  fields: (t) => ({
    genreSetId: t.string({ required: true }),
    parentGenreId: t.string(),
    data: t.field({ type: GenreInputData, required: true }),
  }),
});

const UpdateGenreInput = builder.inputType('UpdateGenreInput', {
  fields: (t) => ({
    id: t.string({ required: true }),
    data: t.field({ type: GenreInputData, required: true }),
  }),
});

const DeleteGenreInput = builder.inputType('DeleteGenreInput', {
  fields: (t) => ({
    id: t.string({ required: true }),
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
        genreSetId,
        parentGenreId,
        data,
      } = args.input;
      const { databaseId: genreSetDatabaseId } = await checkId({
        userId: ctx.currentUserId,
        targetId: genreSetId,
        expectedTypeName: 'GenreSet',
      });
      const { databaseId: parentGenreDatabaseId } = await checkId({
        userId: ctx.currentUserId,
        targetId: parentGenreId ?? undefined,
        expectedTypeName: 'Genre',
      });
      // ジャンルを実際に作る
      return prisma.genre.create({
        data: {
          genreSet: databaseIdToConnect(genreSetDatabaseId),
          parentGenre: databaseIdToConnect(parentGenreDatabaseId),
          ...data,
        },
      });
    },
  }),
  updateGenre: t.prismaField({
    type: Genre,
    args: {
      input: t.arg({ type: UpdateGenreInput, required: true }),
    },
    resolve: async (
      _query,
      _root,
      args,
      ctx,
      _info,
    ) => {
      const { id, data } = args.input;
      const { databaseId } = await checkId({
        userId: ctx.currentUserId,
        targetId: id,
        expectedTypeName: 'Genre',
      });
      return prisma.genre.update({
        where: { databaseId },
        data,
      });
    },
  }),
  deleteGenre: t.prismaField({
    type: Genre,
    args: {
      input: t.arg({ type: DeleteGenreInput, required: true }),
    },
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
      return prisma.genre.delete({
        where: {
          databaseId,
        },
      });
    },
  }),
}));
