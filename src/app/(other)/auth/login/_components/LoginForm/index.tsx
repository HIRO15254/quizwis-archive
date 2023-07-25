'use client';

import {
  Anchor,
  Group, Paper, Stack, Title, Text,
} from '@mantine/core';
import React from 'react';

import { LoginButton } from 'app/(other)/auth/login/_components/LoginButton';

interface LoginFormProps {
  callbackUrl?: string;
}

/**
 * ログインを行うためのフォーム
 */
const LoginForm: React.FC<LoginFormProps> = (props) => {
  const { callbackUrl } = props;
  return (
    <Group position="center" pb="sm">
      <Paper w="100%" maw={500} p="xl" shadow="xs">
        <Title order={1} p="md">
          ログイン
        </Title>
        <Stack px="md" m="auto" style={{ maxWidth: '480px' }}>
          <LoginButton provider="google" callback={callbackUrl}>
            Googleでログイン
          </LoginButton>
          <Text size="sm">
            ログインを行うと、
            <Anchor href="/info/termsofservice">利用規約</Anchor>
            に同意したものとみなします。
          </Text>
        </Stack>
      </Paper>
    </Group>
  );
};

export default LoginForm;
