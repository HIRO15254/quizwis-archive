import { prisma } from '../../../lib/prisma';
import { checkId } from '../../util/checkId';
import { builder } from '../builder';
import { QuizList } from '../object/quizList';

const QuizListInputData = builder.inputType('QuizListInputData', {
  fields: (t) => ({
    name: t.string({ required: true }),
    description: t.string(),
    genreSetId: t.string(),
    goal: t.int(),
  }),
});

const CreateQuizListInput = builder.inputType('CreateQuizListInput', {
  fields: (t) => ({
    data: t.field({ type: QuizListInputData, required: true }),
  }),
});

const UpdateQuizListInput = builder.inputType('UpdateQuizListInput', {
  fields: (t) => ({
    id: t.string({ required: true }),
    data: t.field({ type: QuizListInputData, required: true }),
  }),
});

const DeleteQuizListInput = builder.inputType('DeleteQuizListInput', {
  fields: (t) => ({
    id: t.string({ required: true }),
  }),
});

builder.mutationFields((t) => ({
  createQuizList: t.prismaField({
    type: QuizList,
    args: {
      input: t.arg({ type: CreateQuizListInput, required: true }),
    },
    resolve: async (
      _query,
      _root,
      args,
      ctx,
      _info,
    ) => {
      const { data } = args.input;
      const genreSetDatabaseId = await checkId({
        userId: ctx.currentUserId,
        targetId: data.genreSetId,
        expectedTypeName: 'GenreSet',
      }).then((ret) => ret?.databaseId);
      return prisma.quizList.create({
        data: {
          user: {
            connect: {
              userId: ctx.currentUserId,
            },
          },
          name: data.name,
          description: data.description,
          goal: data.goal,
          genreSet: genreSetDatabaseId ? {
            connect: {
              databaseId: genreSetDatabaseId,
            },
          } : undefined,
        },
      });
    },
  }),
  updateQuizList: t.prismaField({
    type: QuizList,
    args: {
      input: t.arg({ type: UpdateQuizListInput, required: true }),
    },
    resolve: async (
      _query,
      _root,
      args,
      ctx,
      _info,
    ) => {
      const { id, data } = args.input;
      const databaseId = await checkId({
        userId: ctx.currentUserId,
        targetId: id,
        expectedTypeName: 'QuizList',
      }).then((ret) => ret?.databaseId ?? '');
      const genreSetDatabaseId = await checkId({
        userId: ctx.currentUserId,
        targetId: data.genreSetId,
        expectedTypeName: 'GenreSet',
      }).then((ret) => ret?.databaseId);
      return prisma.$transaction(async (p) => {
        const quizList = await p.quizList.update({
          where: { databaseId },
          data: {
            genreSet: genreSetDatabaseId ? {
              connect: {
                databaseId: genreSetDatabaseId,
              },
            } : undefined,
            name: data.name,
            description: data.description,
            goal: data.goal,
          },
          include: {
            genreSet: true,
            quizzes: true,
          },
        });
        if (quizList.genreSet?.databaseId !== genreSetDatabaseId) {
          await Promise.all(quizList.quizzes.map(async (quiz) => {
            await p.quiz.update({
              where: { databaseId: quiz.databaseId },
              data: {
                genre: {
                  disconnect: true,
                },
              },
            });
          }));
        }
        return quizList;
      });
    },
  }),
  deleteQuizList: t.prismaField({
    type: QuizList,
    args: {
      input: t.arg({ type: DeleteQuizListInput, required: true }),
    },
    resolve: async (
      _query,
      _root,
      args,
      ctx,
      _info,
    ) => {
      const { id } = args.input;
      const databaseId = await checkId({
        userId: ctx.currentUserId,
        targetId: id,
        expectedTypeName: 'QuizList',
      }).then((ret) => ret?.databaseId ?? '');
      return prisma.quizList.delete({
        where: { databaseId },
      });
    },
  }),
}));
