import { decodeGlobalID } from '@pothos/plugin-relay';

import { prisma } from '../../lib/prisma';

type Args<T> = {
  userId: string;
  targetId: T;
  expectedTypeName?: 'User' | 'QuizList' | 'Quiz' | 'GenreSet' | 'Genre';
};

type Return = {
  typename: string;
  databaseId: string;
};

type EmptyReturn<T> = {
  typename: undefined;
  databaseId: T;
};

const trueCheckId = async (args: Args<string>): Promise<Return> => {
  const {
    userId,
    targetId,
    expectedTypeName,
  } = args;

  // ユーザー情報がないなら権限なし
  const user = await prisma.user.findUniqueOrThrow({ where: { userId } });

  // IDの型が違うならエラー
  const { typename, id: databaseId } = decodeGlobalID(targetId);
  if (!!expectedTypeName && expectedTypeName !== typename) {
    throw new Error('IDの型が間違っています。');
  }

  // 管理者ならOK
  if (user?.role === 'ADMIN') {
    return { typename, databaseId };
  }

  // 管理者以外の場合の型ごとの処理
  if (typename === 'User') {
    if (userId === databaseId) {
      return { typename, databaseId };
    }
    throw new Error('権限がありません。');
  }
  if (typename === 'QuizList') {
    const quizList = await prisma.quizList.findUniqueOrThrow(
      {
        where: { databaseId },
        include: { user: true },
      },
    );
    if (quizList?.user.userId === userId) {
      return { typename, databaseId };
    }
    throw new Error('権限がありません。');
  }
  if (typename === 'Quiz') {
    const quiz = await prisma.quiz.findUniqueOrThrow(
      {
        where: { databaseId },
        include: { quizList: { include: { user: true } } },
      },
    );
    if (quiz?.quizList.user.userId === userId) {
      return { typename, databaseId };
    }
    throw new Error('権限がありません。');
  }
  if (typename === 'GenreSet') {
    const genreSet = await prisma.genreSet.findUniqueOrThrow(
      {
        where: { databaseId },
        include: { user: true },
      },
    );
    if (genreSet?.user.userId === userId) {
      return { typename, databaseId };
    }
    throw new Error('権限がありません。');
  }
  if (typename === 'Genre') {
    const genre = await prisma.genre.findUniqueOrThrow(
      {
        where: { databaseId },
        include: { genreSet: { include: { user: true } } },
      },
    );
    if (genre?.genreSet.user.userId === userId) {
      return { typename, databaseId };
    }
  }
  throw new Error('不正なIDです。');
};

export function checkId(args: Args<string>): Promise<Return>;
export function checkId(args: Args<string | undefined>): Promise<Return | EmptyReturn<undefined>>;
export function checkId(
  args: Args<string | null | undefined>
): Promise<Return | EmptyReturn<undefined | null>>;
export async function checkId(
  args: Args<string | undefined | null>,
): Promise<Return | EmptyReturn<undefined | null>> {
  if (typeof args.targetId === 'undefined' || args.targetId === null) {
    return { typename: undefined, databaseId: args.targetId };
  }
  return trueCheckId(args as Args<string>);
}
