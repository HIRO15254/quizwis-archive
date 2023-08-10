import { prisma } from '../../../lib/prisma';
import { builder } from '../builder';

export const QuizList = builder.prismaNode('QuizList', {
  id: { field: 'databaseId' },
  fields: (t) => ({
    databaseId: t.exposeString('databaseId'),
    user: t.relation('user'),

    name: t.exposeString('name'),
    description: t.exposeString('description'),

    goal: t.exposeInt('goal'),

    genreSet: t.relation('genreSet', { nullable: true }),
    quizzes: t.relation('quizzes'),
    quizCount: t.field({
      type: 'Int',
      resolve: async (parent, _args, _ctx, _info) => {
        const ret = await prisma.quiz.count({ where: { quizlistId: parent.databaseId } });
        return ret;
      },
    }),
    allQuizHtml: t.field({
      type: 'String',
      resolve: async (parent, _args, _ctx, _info) => {
        const dat = await prisma.quiz.findMany({
          where: { quizlistId: parent.databaseId },
        });
        for (let i = dat.length - 1; i > 0; i -= 1) {
          const j = Math.floor(Math.random() * (i + 1));
          [dat[i], dat[j]] = [dat[j], dat[i]];
        }
        let ret = '';
        for (let i = 0; i < dat.length; i += 1) {
          ret += `<tr><td>${i + 1}</td><td>${dat[i].question}</td><td>${dat[i].answer}${dat[i].otherAnswer.replace('<p></p>', '').replace('<p>', '<p class="sub">')}${dat[i].explanation.replace('<p></p>', '').replace('<p>', '<p class="sub">')}</td></tr>`;
        }
        return ret;
      },
    }),
  }),
});
