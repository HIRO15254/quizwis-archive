import { decodeGlobalID } from '@pothos/plugin-relay';

import { prisma } from '../../../../lib/prisma';
import { checkAuthority } from '../../../util/checkAuthority';
import { builder } from '../../builder';
import { QuizList } from '../../object/quizList';

const GetQuizListInput = builder.inputType('GetQuizListInput', {
  fields: (t) => ({
    id: t.string({ required: true }),
  }),
});

builder.queryField('getQuizList', (t) => t.prismaField({
  type: QuizList,
  args: { input: t.arg({ type: GetQuizListInput, required: true }) },
  resolve: async (
    _query,
    _root,
    args,
    ctx,
    _info,
  ) => {
    const { typename, id: databaseId } = decodeGlobalID(args.input.id);
    if (typename !== 'QuizList') {
      throw new Error('idがQuizListのものではありません');
    }
    const quizList = await prisma.quizList.findUnique({
      where: { databaseId },
      include: { user: true },
    });
    if (quizList?.user.userId !== ctx.currentUserId) {
      if (!await checkAuthority(ctx.currentUserId ?? '', 'ADMIN')) {
        throw new Error('権限がありません。');
      }
    }
    return prisma.quizList.findUniqueOrThrow({
      where: { databaseId },
      include: {
        genreSet: {
          include: {
            genres: {
              orderBy: { createdAt: 'asc' },
              include: {
                childGenres: {
                  orderBy: { createdAt: 'asc' },
                },
              },
            },
          },
        },
      },
    });
  },
}));
