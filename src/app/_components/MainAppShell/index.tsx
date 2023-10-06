'use client';

import {
  AppShell, useComputedColorScheme,
  useMantineTheme,
} from '@mantine/core';
import React, { useState } from 'react';

import { MainHeader } from 'app/_components/MainHeader';
import { MainNavBar } from 'app/_components/MainNavBar';
import { MANTINE_SMARTPHONE_BREAKPOINT } from 'config/layoutConfig';
import { colors } from 'styles/colors';

interface MainAppShellProps {
  children: React.ReactNode;
  noHeader?: boolean;
  noNavbar?: boolean;
}

/**
 * UIの最も起点にするコンポーネント
 */
export const MainAppShell: React.FC<MainAppShellProps> = (props) => {
  const {
    children,
    noHeader = false,
    noNavbar = false,
  } = props;

  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const colorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return (
    <AppShell
      transitionDuration={300}
      transitionTimingFunction="ease"
      header={{
        height: 80,
      }}
      navbar={{
        breakpoint: 'md',
        width: 300,
        collapsed: {
          mobile: !opened,
          desktop: !opened,
        },
      }}
      styles={{ main: { background: colors.pageBackground(theme, colorScheme) } }}
    >
      {!noHeader && (
        <MainHeader
          opened={opened}
          noBurger={noNavbar}
          onBurgerClick={() => setOpened((o) => !o)}
        />
      )}
      {!noNavbar && (
        <MainNavBar />
      )}
      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  );
};
