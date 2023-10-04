import { prisma } from '../../../lib/prisma';
import { checkId } from '../../util/checkId';
import { builder } from '../builder';
import { GenreSet } from '../object/genreSet';

const GenreSetInputData = builder.inputType('GenreSetInput', {
  fields: (t) => ({
    name: t.string({ required: true }),
    description: t.string(),
  }),
});

const CreateGenreSetInput = builder.inputType('CreateGenreSetInput', {
  fields: (t) => ({
    data: t.field({ type: GenreSetInputData, required: true }),
  }),
});

const UpdateGenreSetInput = builder.inputType('UpdateGenreSetInput', {
  fields: (t) => ({
    id: t.string({ required: true }),
    data: t.field({ type: GenreSetInputData, required: true }),
  }),
});

const DeleteGenreSetInput = builder.inputType('DeleteGenreSetInput', {
  fields: (t) => ({
    id: t.string({ required: true }),
  }),
});

builder.mutationFields((t) => ({
  createGenreSet: t.prismaField({
    type: GenreSet,
    args: {
      input: t.arg({ type: CreateGenreSetInput, required: true }),
    },
    resolve: async (
      _query,
      _root,
      args,
      ctx,
      _info,
    ) => {
      const { data } = args.input;
      return prisma.genreSet.create({
        data: {
          user: {
            connect: {
              userId: ctx.currentUserId,
            },
          },
          name: data.name,
          description: data.description,
        },
      });
    },
  }),
  updateGenreSet: t.prismaField({
    type: GenreSet,
    args: {
      input: t.arg({ type: UpdateGenreSetInput, required: true }),
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
        expectedTypeName: 'GenreSet',
      });
      return prisma.genreSet.update({
        where: {
          databaseId,
        },
        data: {
          name: data.name,
          description: data.description,
        },
      });
    },
  }),
  deleteGenreSet: t.prismaField({
    type: GenreSet,
    args: {
      input: t.arg({ type: DeleteGenreSetInput, required: true }),
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
        expectedTypeName: 'GenreSet',
      });
      return prisma.genreSet.delete({
        where: {
          databaseId,
        },
      });
    },
  }),
}));
