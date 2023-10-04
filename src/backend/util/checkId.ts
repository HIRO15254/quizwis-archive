import { decodeGlobalID } from '@pothos/plugin-relay';

import { prisma } from '../../lib/prisma';

type Args = {
  userId: string;
  targetId: string | null | undefined;
  expectedTypeName?: string;
};

type Return = {
  typename: string;
  databaseId: string;
};

export const checkId = async (args: Args): Promise<Return | undefined> => {
  const {
    userId,
    targetId,
    expectedTypeName,
  } = args;

  // ユーザー情報がないなら権限なし
  const user = await prisma.user.findUniqueOrThrow({ where: { userId } });
  // IDが指定されていないなら終了
  if (!targetId) {
    return undefined;
  }

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
  throw new Error('不正なIDです。');
};
