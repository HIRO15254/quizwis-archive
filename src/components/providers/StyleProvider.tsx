'use client';

import {
  MantineProvider,
} from '@mantine/core';
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

  return (
    <MantineProvider theme={theme}>
      <Notifications />
      {children}
    </MantineProvider>
  );
};
