'use client';

import { Button, Anchor } from '@mantine/core';
import React from 'react';

/**
 * 非ログイン時にヘッダーに表示されるログインページへのリンクボタン
 */
export const MainHeaderLoginButton: React.FC = () => (
  <Anchor unstyled href="/auth/login">
    <Button>
      ログイン
    </Button>
  </Anchor>
);
