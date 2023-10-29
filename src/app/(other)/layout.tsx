import React from 'react';

interface Props {
  children: React.ReactNode
}

/**
 * 非ログイン必須ページのレイアウト
 */
const RootLayout = async (props: Props) => {
  const { children } = props;
  return (
    <div>
      {children}
    </div>
  );
};

export default RootLayout;
