'use client';

import { useMantineColorScheme } from '@mantine/core';
import { useHotkeys } from '@mantine/hooks';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

export const HotKeysProvider = (props: Props) => {
  const {
    children,
  } = props;

  const { toggleColorScheme } = useMantineColorScheme();

  useHotkeys([
    ['ctrl+j', toggleColorScheme, { preventDefault: true }],
  ]);

  return children;
};
