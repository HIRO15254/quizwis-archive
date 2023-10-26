import React from 'react';

import { ApplicationAppShell } from './_components/ApplicationAppShell';

interface Props {
  children: React.ReactNode
}

/**
 * アプリケーション内のページに共通するレイアウト
 */
const ApplicationLayout = async (props: Props) => {
  const { children } = props;

  return (
    <ApplicationAppShell>
      {children}
    </ApplicationAppShell>
  );
};

export default ApplicationLayout;
