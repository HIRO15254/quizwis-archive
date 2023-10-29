'use client';

import {
  Menu, Anchor, UnstyledButton,
} from '@mantine/core';
import { IconLogout, IconSettings } from '@tabler/icons-react';
import { signOut } from 'next-auth/react';
import React from 'react';

interface Props {
  children: React.ReactNode
}

/**
 * 画面の右上に表示されるユーザー情報表示とそこからのドロップダウンメニュー
 */
export const UserMenu: React.FC<Props> = (props) => {
  const {
    children,
  } = props;

  return (
    <Menu
      width={260}
      position="bottom-end"
      transitionProps={{ transition: 'pop-top-right' }}
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton>
          {children}
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>
          アカウント
        </Menu.Label>
        <Anchor unstyled href="/application/settings/user">
          <Menu.Item
            leftSection={<IconSettings size="0.9rem" stroke={1.5} />}
          >
            アカウント設定
          </Menu.Item>
        </Anchor>
        <Menu.Item
          color="red"
          leftSection={<IconLogout size="0.9rem" stroke={1.5} />}
          onClick={() => { signOut({ callbackUrl: '/application/dashboard' }); }}
        >
          ログアウト
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
