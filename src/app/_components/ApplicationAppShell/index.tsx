'use client';

import {
  AppShell,
} from '@mantine/core';
import React, { useState } from 'react';

import { Navbar } from 'app/_components/ApplicationAppShell/Navbar';
import { SMARTPHONE_BREAKPOINT } from 'config/layoutConfig';

import classes from './ApplicationAppShell.module.css';
import { Header } from './Header';

interface Props {
  children: React.ReactNode;
}

/**
 * アプリケーション内のページで表示されるコンポーネント
 */
export const ApplicationAppShell: React.FC<Props> = (props) => {
  const {
    children,
  } = props;

  const [
    mobileOpened,
    setMobileOpened,
  ] = useState(false);
  const [
    desktopOpened,
    setDesktopOpened,
  ] = useState(true);

  return (
    <AppShell
      header={{
        height: 60,
      }}
      navbar={{
        width: 300,
        breakpoint: SMARTPHONE_BREAKPOINT,
        collapsed: {
          mobile: !mobileOpened,
          desktop: !desktopOpened,
        },
      }}
      padding={{ base: 10, sm: 15 }}
      classNames={{
        main: classes.main,
      }}
    >
      <Header
        burgerOpened={{
          mobile: mobileOpened,
          desktop: desktopOpened,
        }}
        onBurgerClick={{
          mobile: () => setMobileOpened((o) => !o),
          desktop: () => setDesktopOpened((o) => !o),
        }}
      />
      <Navbar />
      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  );
};
