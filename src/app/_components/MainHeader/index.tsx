'use client';

import {
  AppShell, Code, Burger, useMantineTheme, Group, Title, Anchor,
} from '@mantine/core';
import { useSession } from 'next-auth/react';
import React from 'react';

import { MainHeaderUserMenu } from 'app/_components/MainHeaderUserMenu';

import packageJson from '../../../../package.json';
import { MainHeaderLoginButton } from '../MainHeaderLoginButton';

interface MainHeaderProps {
  opened: boolean;
  onBurgerClick: () => void;
  noBurger?: boolean;
}

/**
 * 全てのページで表示されるヘッダー
 */
export const MainHeader: React.FC<MainHeaderProps> = (props) => {
  const {
    opened,
    onBurgerClick,
    noBurger,
  } = props;

  const theme = useMantineTheme();
  const { data: session } = useSession();

  return (
    <AppShell.Header p="xs">
      <Group justify="space-between">
        <Group justify="space-between">
          {!noBurger && (
            <Burger
              opened={opened}
              onClick={onBurgerClick}
              size="sm"
              color={theme.colors.gray[6]}
              mr="xl"
            />
          )}
          <Anchor href="/">
            <Title order={3}>{packageJson.name}</Title>
          </Anchor>
          <Code>{`v${packageJson.version}`}</Code>
        </Group>
        {!session && (
          <MainHeaderLoginButton />
        )}
        {session && (
          <Group>
            {noBurger && (
              <Anchor mr="lg" href="/dashboard">
                アプリケーションへ移動
              </Anchor>
            )}
            <MainHeaderUserMenu session={session} />
          </Group>
        )}
      </Group>
    </AppShell.Header>
  );
};
