'use client';

import { CacheProvider } from '@emotion/react';
import {
  useEmotionCache, MantineProvider, ColorSchemeProvider, ColorScheme,
} from '@mantine/core';
import { useHotkeys } from '@mantine/hooks';
import { Notifications } from '@mantine/notifications';
import { useServerInsertedHTML } from 'next/navigation';
import React, { useState } from 'react';

type Props = {
  children: React.ReactNode;
  colorScheme: ColorScheme;
  setColorScheme: (value: ColorScheme) => void;
};

export const StyleProvider = (props: Props) => {
  const {
    children,
    colorScheme: propColorScheme,
    setColorScheme: propSetColorScheme,
  } = props;

  const [colorScheme, setColorScheme] = useState<ColorScheme>(propColorScheme);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    propSetColorScheme(nextColorScheme);
  };

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  const cache = useEmotionCache();
  cache.compat = true;

  useServerInsertedHTML(() => (
    <style
      data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(' ')}`}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: Object.values(cache.inserted).join(' '),
      }}
    />
  ));

  return (
    <CacheProvider value={cache}>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme }}>
          <Notifications />
          {children}
        </MantineProvider>
      </ColorSchemeProvider>
    </CacheProvider>
  );
};
