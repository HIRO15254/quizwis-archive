'use client';

import { ButtonProps } from '@mantine/core';
import { signIn } from 'next-auth/react';
import React from 'react';

import GoogleLoginButton from 'app/(other)/auth/login/_components/GoogleLoginButton';

interface LoginButtonProps extends ButtonProps {
  provider: 'google',
  callback?: string;
}

/**
 * プロバイダーを指定してログインを行うボタン
 * @param props mantineのButtonPropsを継承 + provider: プロバイダー名 + callback: コールバックURL
 */
export const LoginButton: React.FC<LoginButtonProps> = (props) => {
  const { provider, callback, ...rest } = props;

  const handleLogin = () => {
    signIn(provider, { callbackUrl: callback });
  };

  if (provider === 'google') {
    return <GoogleLoginButton onClick={handleLogin} {...rest} />;
  }
  return null;
};
