'use client';

import { Title, Group, Paper } from '@mantine/core';
import React from 'react';

export const MainPageContents: React.FC = () => (
  <Group justify="center" pb="sm">
    <Paper w="100%" maw={800} p="xl" shadow="xs">
      <Title>This is a Main Page</Title>
    </Paper>
  </Group>
);
