import { ContextFunction } from '@apollo/server';
import { NextApiHandler } from 'next';
import { getServerSession } from 'next-auth';

import { authOptions } from '../../lib/nextAuth';

export type Context = {
  currentUserId: string;
};

type CreateContextType = ContextFunction<Parameters<NextApiHandler>, Context>;

export const createContext: CreateContextType = async () => {
  const session = await getServerSession(authOptions).catch(() => null);
  const currentUserId = session?.user?.userId ?? '';
  return {
    currentUserId,
  };
};
