'use client';

import {
  MantineProvider,
  useMantineColorScheme,
} from '@mantine/core';
import { useHotkeys } from '@mantine/hooks';
import { Notifications } from '@mantine/notifications';
import React from 'react';

import { theme } from 'styles/theme';

type Props = {
  children: React.ReactNode;
};

export const StyleProvider = (props: Props) => {
  const {
    children,
  } = props;

  const { toggleColorScheme } = useMantineColorScheme();
  useHotkeys([['mod+j', () => toggleColorScheme(), { preventDefault: true }]]);

  return (
    <>
      <Notifications />
      {children}
    </>
  );
};
