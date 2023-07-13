'use client';

import {
  Group, Menu, UnstyledButton, rem, Text, Anchor, Stack, createStyles,
} from '@mantine/core';
import { IconChevronDown, IconLogout, IconSettings } from '@tabler/icons-react';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import React from 'react';

import { UserAvatar } from 'components/common/UserAvatar';

const useStyles = createStyles((theme) => ({
  userName: {
    lineHeight: 1,
    fontWeight: 500,
    fontSize: theme.fontSizes.md,
    mr: theme.spacing.xs,
  },
  userId: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
    lineHeight: 1,
    fontSize: theme.fontSizes.xs,
    mr: theme.spacing.xs,
  },
}));

interface MainHeaderUserMenuProps {
  session: Session
}

/**
 * 画面の右上に表示されるユーザー情報表示とそこからのドロップダウンメニュー
 */
export const MainHeaderUserMenu: React.FC<MainHeaderUserMenuProps> = (props) => {
  const { session } = props;

  const { classes } = useStyles();

  return (
    <Menu
      width={260}
      position="bottom-end"
      transitionProps={{ transition: 'pop-top-right' }}
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton>
          <Group spacing={7}>
            <UserAvatar user={session?.user} size="md" />
            <Stack spacing={5}>
              <Text className={classes.userName}>
                {session?.user.name}
              </Text>
              <Text className={classes.userId}>
                {`@${session?.user.userId}`}
              </Text>
            </Stack>
            <IconChevronDown size={rem(20)} stroke={1.5} />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>
          アカウント
        </Menu.Label>
        <Anchor unstyled href="/settings/user">
          <Menu.Item
            icon={<IconSettings size="0.9rem" stroke={1.5} />}
          >
            アカウント設定
          </Menu.Item>
        </Anchor>
        <Menu.Item
          color="red"
          icon={<IconLogout size="0.9rem" stroke={1.5} />}
          onClick={() => { signOut({ callbackUrl: '/' }); }}
        >
          ログアウト
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
