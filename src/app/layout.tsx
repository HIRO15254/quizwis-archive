import { ColorSchemeScript } from '@mantine/core';
import React from 'react';

import { AuthProvider } from 'components/providers/AuthProvider';
import { GqlProvider } from 'components/providers/GqlProvider';
import { HotKeysProvider } from 'components/providers/HotKeysProvider';
import { StyleProvider } from 'components/providers/StyleProvider';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/tiptap/styles.css';
import 'styles/globalColor.css';

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
        <meta charSet="utf-8" />
        <title>{metadata.title}</title>
        {/* PWA用ここから */}
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        {/* PWA用ここまで */}
        <ColorSchemeScript />
      </head>
      <body>
        <GqlProvider>
          <AuthProvider>
            <StyleProvider>
              <HotKeysProvider>
                {children}
              </HotKeysProvider>
            </StyleProvider>
          </AuthProvider>
        </GqlProvider>
      </body>
    </html>
  );
};

export default RootLayout;
