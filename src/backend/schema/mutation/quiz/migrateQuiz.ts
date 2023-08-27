import { prisma } from '../../../../lib/prisma';
import { checkAuthority } from '../../../util/checkAuthority';
import { getVfmLength } from '../../../util/htmlUtil';
import { builder } from '../../builder';
import { Quiz } from '../../object/quiz';

builder.mutationFields((t) => ({
  migrateQuiz: t.prismaField({
    type: [Quiz],
    args: {},
    resolve: async (_query, _root, args, ctx, _info) => {
      const quizList = await prisma.quiz.findMany();
      if (!await checkAuthority(ctx.currentUserId, 'ADMIN')) {
        throw new Error('権限がありません。');
      }
      quizList.forEach(async (quiz) => {
        const newQuestion = quiz.question
          .replace(/<p>/g, '')
          .replace(/<\/p>/g, '')
          .replace(/<ruby><rb>/g, '{')
          .replace(/<\/rb><rt>/g, '|')
          .replace(/<\/rt><\/ruby>/g, '}');
        const newAnswer = quiz.answer
          .replace(/<p>/g, '')
          .replace(/<\/p>/g, '')
          .replace(/<ruby><rb>/g, '{')
          .replace(/<\/rb><rt>/g, '|')
          .replace(/<\/rt><\/ruby>/g, '}');
        const newExplanation = quiz.explanation
          .replace(/<p>/g, '')
          .replace(/<\/p>/g, '')
          .replace(/<ruby><rb>/g, '{')
          .replace(/<\/rb><rt>/g, '|')
          .replace(/<\/rt><\/ruby>/g, '}');
        const newOtherAnswer = quiz.otherAnswer
          .replace(/<p>/g, '')
          .replace(/<\/p>/g, '')
          .replace(/<ruby><rb>/g, '{')
          .replace(/<\/rb><rt>/g, '|')
          .replace(/<\/rt><\/ruby>/g, '}');
        const newSource = quiz.source
          .replace(/<p>/g, '')
          .replace(/<\/p>/g, '')
          .replace(/<ruby><rb>/g, '{')
          .replace(/<\/rb><rt>/g, '|')
          .replace(/<\/rt><\/ruby>/g, '}');
        await prisma.quiz.update({
          where: {
            databaseId: quiz.databaseId,
          },
          data: {
            question: newQuestion,
            answer: newAnswer,
            explanation: newExplanation,
            otherAnswer: newOtherAnswer,
            source: newSource,
            length: getVfmLength(newQuestion),
          },
        });
      });
      return [];
    },
  }),
}));
