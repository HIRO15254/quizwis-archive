'use client';

import { Stack, Title } from '@mantine/core';
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
    <>
      <Title order={1} p="md">
        ログイン
      </Title>
      <Stack px="md" m="auto" style={{ maxWidth: '480px' }}>
        <LoginButton provider="google" callback={callbackUrl}>
          Googleでログイン
        </LoginButton>
      </Stack>
    </>
  );
};

export default LoginForm;
