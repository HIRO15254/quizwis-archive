'use client';

import {
  Group, Menu, UnstyledButton, Text, Anchor, Stack,
} from '@mantine/core';
import { IconChevronDown, IconLogout, IconSettings } from '@tabler/icons-react';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import React from 'react';

import { UserAvatar } from 'components/common/UserAvatar';

import classes from './index.module.css';

interface MainHeaderUserMenuProps {
  session: Session
}

/**
 * 画面の右上に表示されるユーザー情報表示とそこからのドロップダウンメニュー
 */
export const MainHeaderUserMenu: React.FC<MainHeaderUserMenuProps> = (props) => {
  const { session } = props;

  return (
    <Menu
      width={260}
      position="bottom-end"
      transitionProps={{ transition: 'pop-top-right' }}
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton>
          <Group gap={7}>
            <UserAvatar user={session?.user} size="md" />
            <Stack gap={5}>
              <Text mr="xs" className={classes.userName}>
                {session?.user.name}
              </Text>
              <Text mr="xs" className={classes.userId}>
                {`@${session?.user.userId}`}
              </Text>
            </Stack>
            <IconChevronDown size={20} stroke={1.5} />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>
          アカウント
        </Menu.Label>
        <Anchor unstyled href="/settings/user">
          <Menu.Item
            leftSection={<IconSettings size="0.9rem" stroke={1.5} />}
          >
            アカウント設定
          </Menu.Item>
        </Anchor>
        <Menu.Item
          color="red"
          leftSection={<IconLogout size="0.9rem" stroke={1.5} />}
          onClick={() => { signOut({ callbackUrl: '/' }); }}
        >
          ログアウト
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
