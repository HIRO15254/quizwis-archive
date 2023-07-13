import React from 'react';

import { MainAppShell } from 'app/_components/MainAppShell';

interface Props {
  children: React.ReactNode
}

/**
 * 非ログイン必須ページのレイアウト
 */
const RootLayout = async (props: Props) => {
  const { children } = props;
  return (
    <MainAppShell noNavbar>
      {children}
    </MainAppShell>
  );
};

export default RootLayout;
