'use client';

// 各種import
import { Title, Paper, Group } from '@mantine/core';
import React, { useEffect } from 'react';

import { useGetGenreSetsLazyQuery } from 'gql';

import { GenreSetTable } from '../../presenter/GenreSetTable';

/**
 * クイズリストの一覧表示
 */
export const GenreSetTableContainer: React.FC = () => {
  const [reload, { loading, data }] = useGetGenreSetsLazyQuery({ fetchPolicy: 'network-only' });

  useEffect(() => {
    reload();
  }, [reload]);

  // 実際のコンポーネント
  return (
    <Group position="center" pb="sm">
      <Paper w="100%" maw={800} p="xl" shadow="xs">
        <Title order={1}>ジャンルセット一覧</Title>
        <GenreSetTable
          data={data?.getGenreSets ?? []}
          loading={loading}
          openCreateGenreSetModal={() => {}}
          openDeleteGenreSetModal={() => {}}
          openEditGenreSetModal={() => {}}
        />
      </Paper>
    </Group>
  );
};
