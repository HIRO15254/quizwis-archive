'use client';

import { Group, Paper, Title } from '@mantine/core';
import React from 'react';

import { DashBoard } from '../../_components/DashBoard';

/**
 * 説明
 */
export const DashBoardContainer: React.FC = () => (
  <Group justify="center" pb="sm">
    <Paper w="100%" maw={1200} p="xl" shadow="xs">
      <Title order={1} mb="md">ダッシュボード</Title>
      <DashBoard />
    </Paper>
  </Group>
);
