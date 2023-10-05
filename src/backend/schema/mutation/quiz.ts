import { prisma } from '../../../lib/prisma';
import { checkId } from '../../util/checkId';
import { databaseIdToConnect } from '../../util/databaseIdToConnect';
import { builder } from '../builder';
import { Quiz } from '../object/quiz';

const QuizInputData = builder.inputType('QuizInputData', {
  fields: (t) => ({
    question: t.string(),
    answer: t.string(),
    explanation: t.string(),
    otherAnswer: t.string(),
    source: t.string(),
    length: t.int({ required: true, defaultValue: 0 }),
    genreId: t.string(),
  }),
});

const connectGenreCheck = async (genreDatabaseId: string, quizListDatabaseId: string) => {
  const genre = await prisma.genre.findUnique({
    where: { databaseId: genreDatabaseId },
    include: { genreSet: true },
  });
  const quizList = await prisma.quizList.findUnique({
    where: { databaseId: quizListDatabaseId },
    include: { genreSet: true },
  });
  if (genre?.genreSetId !== quizList?.genreSetId) {
    throw new Error('ジャンルセットが異なります。');
  }
};

const CreateQuizInput = builder.inputType('CreateQuizInput', {
  fields: (t) => ({
    quizListId: t.string({ required: true }),
    data: t.field({ type: QuizInputData, required: true }),
  }),
});

const UpdateQuizInput = builder.inputType('UpdateQuizInput', {
  fields: (t) => ({
    id: t.string({ required: true }),
    data: t.field({ type: QuizInputData, required: true }),
  }),
});

const DeleteQuizInput = builder.inputType('DeleteQuizInput', {
  fields: (t) => ({
    id: t.string({ required: true }),
  }),
});

builder.mutationFields((t) => ({
  createQuiz: t.prismaField({
    type: Quiz,
    args: {
      input: t.arg({ type: CreateQuizInput, required: true }),
    },
    resolve: async (_query, _root, args, ctx, _info) => {
      const { quizListId, data } = args.input;
      const { genreId, ...simpleData } = data;
      const { databaseId: quizListDatabaseId } = await checkId({
        userId: ctx.currentUserId,
        targetId: quizListId,
        expectedTypeName: 'QuizList',
      });
      const { databaseId: genreDatabaseId } = await checkId({
        userId: ctx.currentUserId,
        targetId: genreId ?? undefined,
        expectedTypeName: 'Genre',
      });
      if (genreDatabaseId) {
        await connectGenreCheck(genreDatabaseId, quizListDatabaseId ?? '');
      }
      return prisma.quiz.create({
        data: {
          user: {
            connect: {
              userId: ctx.currentUserId,
            },
          },
          quizList: databaseIdToConnect(quizListDatabaseId),
          genre: databaseIdToConnect(genreDatabaseId),
          ...simpleData,
        },
      });
    },
  }),
  updateQuiz: t.prismaField({
    type: Quiz,
    args: {
      input: t.arg({ type: UpdateQuizInput, required: true }),
    },
    resolve: async (_query, _root, args, ctx, _info) => {
      const { id, data } = args.input;
      const { genreId, ...simpleData } = data;
      const { databaseId } = await checkId({
        userId: ctx.currentUserId,
        targetId: id,
        expectedTypeName: 'Quiz',
      });
      const { databaseId: genreDatabaseId } = await checkId({
        userId: ctx.currentUserId,
        targetId: genreId,
        expectedTypeName: 'Genre',
      });
      return prisma.quiz.update({
        where: {
          databaseId,
        },
        data: {
          genre: databaseIdToConnect(genreDatabaseId),
          ...simpleData,
        },
      });
    },
  }),
  deleteQuiz: t.prismaField({
    type: Quiz,
    args: {
      input: t.arg({ type: DeleteQuizInput, required: true }),
    },
    resolve: async (_query, _root, args, ctx, _info) => {
      const { id } = args.input;
      const { databaseId } = await checkId({
        userId: ctx.currentUserId,
        targetId: id,
        expectedTypeName: 'Quiz',
      });
      return prisma.quiz.delete({
        where: {
          databaseId,
        },
      });
    },
  }),
}));
