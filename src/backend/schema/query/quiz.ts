import { prisma } from '../../../lib/prisma';
import { checkId } from '../../util/checkId';
import { builder } from '../builder';
import { Quiz } from '../object/quiz';

const GetQuizInput = builder.inputType('GetQuizInput', {
  fields: (t) => ({
    id: t.string({ required: true }),
  }),
});

const PaginationInput = builder.inputType('PaginationInput', {
  fields: (t) => ({
    skip: t.int({ required: true }),
    take: t.int({ required: true }),
  }),
});

export const QuizFilterInput = builder.inputType('QuizFilterInput', {
  fields: (t) => ({
    genreId: t.string(),
  }),
});

const GetQuizzesInput = builder.inputType('GetQuizzesInput', {
  fields: (t) => ({
    listId: t.string({ required: true }),
    pagination: t.field({ type: PaginationInput, required: true }),
    filter: t.field({ type: QuizFilterInput }),
  }),
});

builder.queryFields((t) => ({
  getQuiz: t.prismaField({
    type: Quiz,
    args: { input: t.arg({ type: GetQuizInput, required: true }) },
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
        expectedTypeName: 'Quiz',
      });
      return prisma.quiz.findUniqueOrThrow({
        where: { databaseId },
      });
    },
  }),
  getQuizzes: t.prismaField({
    type: [Quiz],
    args: { input: t.arg({ type: GetQuizzesInput, required: true }) },
    resolve: async (
      _query,
      _root,
      args,
      ctx,
      _info,
    ) => {
      const {
        listId,
        pagination,
        filter,
      } = args.input;
      const { databaseId: listDatabaseId } = await checkId({
        userId: ctx.currentUserId,
        targetId: listId,
        expectedTypeName: 'QuizList',
      });
      const { databaseId: genreDatabaseId } = await checkId({
        userId: ctx.currentUserId,
        targetId: filter?.genreId,
        expectedTypeName: 'Genre',
      });
      return prisma.quiz.findMany({
        where: {
          quizList: {
            databaseId: listDatabaseId,
          },
          genre: genreDatabaseId ? {
            databaseId: genreDatabaseId,
          } : undefined,
        },
        take: pagination.take,
        skip: pagination.skip,
      });
    },
  }),
}));
