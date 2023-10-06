import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import React from 'react';

import { AuthProvider } from 'components/providers/AuthProvider';
import { GqlProvider } from 'components/providers/GqlProvider';

import '@mantine/core/styles.css';

import { StyleProvider } from '../components/providers/StyleProvider';
import { theme } from '../styles/theme';

interface RootLayoutProps {
  children: React.ReactNode
}

export const metadata = {
  title: 'QuizWis',
  description: '競技クイズ支援Webアプリケーション',
};

const RootLayout: React.FC<RootLayoutProps> = (props) => {
  const { children } = props;

  return (
    <html lang="ja">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <ColorSchemeScript />
      </head>
      <body>
        <GqlProvider>
          <AuthProvider>
            <MantineProvider theme={theme}>
              <StyleProvider>
                {children}
              </StyleProvider>
            </MantineProvider>
          </AuthProvider>
        </GqlProvider>
      </body>
    </html>
  );
};

export default RootLayout;
