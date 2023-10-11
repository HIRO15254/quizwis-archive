import React from 'react';

import { ApplicationAppShell } from '../_components/ApplicationAppShell';

interface ApplicationLayoutProps {
  children: React.ReactNode
}

/**
 * アプリケーション内のページに共通するレイアウト
 */
const RootLayout = async (props: ApplicationLayoutProps) => {
  const { children } = props;

  return (
    <ApplicationAppShell>
      {children}
    </ApplicationAppShell>
  );
};

export default RootLayout;
