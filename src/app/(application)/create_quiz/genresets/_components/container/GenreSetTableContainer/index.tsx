'use client';

// 各種import
import { Title, Paper, Group } from '@mantine/core';
import React, { useEffect } from 'react';

import { useGetGenreSetsLazyQuery } from 'gql';

import { useCreateGenreSetModal } from '../../../_hooks/useCreateGenreSetModal';
import { CreateGenreSetModal } from '../../presenter/CreateGenreSetModal';
import { GenreSetTable } from '../../presenter/GenreSetTable';

/**
 * クイズリストの一覧表示
 */
export const GenreSetTableContainer: React.FC = () => {
  const [reload, { loading, data }] = useGetGenreSetsLazyQuery({ fetchPolicy: 'network-only' });
  const {
    opened: createGenreSetModalOpened,
    handlers: createGenreSetModalHandlers,
    form: createGenreSetForm,
    onSubmit: onSubmitCreateGenreSetForm,
  } = useCreateGenreSetModal({ reload });

  useEffect(() => {
    reload();
  }, [reload]);

  // 実際のコンポーネント
  return (
    <Group position="center" pb="sm">
      <Paper w="100%" maw={800} p="xl" shadow="xs">
        <Title order={1}>ジャンルセット一覧</Title>
        <CreateGenreSetModal
          opened={createGenreSetModalOpened}
          onClose={createGenreSetModalHandlers.close}
          form={createGenreSetForm}
          onSubmit={onSubmitCreateGenreSetForm}
        />
        <GenreSetTable
          data={data?.getGenreSets ?? []}
          loading={loading}
          openCreateGenreSetModal={createGenreSetModalHandlers.open}
          openDeleteGenreSetModal={() => {}}
          openEditGenreSetModal={() => {}}
        />
      </Paper>
    </Group>
  );
};
