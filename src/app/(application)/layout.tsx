import { getServerSession } from 'next-auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

import { MainAppShell } from 'app/_components/MainAppShell';

interface ApplicationLayoutProps {
  children: React.ReactNode
}

/**
 * アプリケーション内のページに共通するレイアウト
 */
const RootLayout: React.FC<ApplicationLayoutProps> = async (props) => {
  const { children } = props;

  const url = headers().get('referer') ?? '';
  const session = await getServerSession();

  if (!session) {
    redirect(`/auth/login?callbackUrl=${url}`);
  }
  return (
    <MainAppShell>
      {children}
    </MainAppShell>
  );
};

export default RootLayout;
