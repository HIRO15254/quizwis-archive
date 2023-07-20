import { prisma } from '../../lib/prisma';

type Authority = 'ADMIN' | 'USER' | 'GUEST';

export const checkAuthority = async (userId: string, authority: Authority) => {
  const user = await prisma.user.findUnique({ where: { userId } });
  if (!user) {
    return false;
  }
  if (authority === 'ADMIN') {
    return user.role === 'ADMIN';
  }
  return true;
};
