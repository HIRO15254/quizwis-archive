'use client';

import {
  AppShell,
  Group,
  Paper,
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

  return (
    <AppShell
      styles={{
        main: {
          background: colors.pageBackground(theme),
        },
      }}
      navbarOffsetBreakpoint={noNavbar ? 100000 : MANTINE_SMARTPHONE_BREAKPOINT}
      navbar={
        !noNavbar ? <MainNavBar opened={opened} /> : undefined
      }
      header={
        !noHeader ? (
          <MainHeader
            opened={opened}
            noBurger={noNavbar}
            onBurgerClick={() => setOpened((o) => !o)}
          />
        ) : undefined
      }
    >
      <Group position="center" pb="sm">
        <Paper w="100%" maw={800} p="lg" shadow="xs">
          {children}
        </Paper>
      </Group>
    </AppShell>
  );
};
