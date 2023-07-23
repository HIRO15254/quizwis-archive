'use client';

// 各種import
import { Title, Paper, Group } from '@mantine/core';
import React, { useEffect } from 'react';

import { useGetGenreSetsLazyQuery } from 'gql';

import { useCreateGenreSetModal } from '../../../_hooks/useCreateGenreSetModal';
import { useDeleteGenreSetModal } from '../../../_hooks/useDeleteGenreSetModal';
import { useUpdateGenreSetModal } from '../../../_hooks/useUpdateGenreSetModal';
import { DeleteGenreSetModal } from '../../presenter/DeleteGenreSetModal';
import { GenreSetFormModal } from '../../presenter/GenreSetFormModal';
import { GenreSetTable } from '../../presenter/GenreSetTable';
/**
 * クイズリストの一覧表示
 */
export const GenreSetTableContainer: React.FC = () => {
  const [reload, { loading, data, called }] = useGetGenreSetsLazyQuery({ fetchPolicy: 'network-only' });
  const {
    modalProps: createGenreSetModalProps,
    handlers: createGenreSetModalHandlers,
  } = useCreateGenreSetModal({ reload });
  const {
    modalProps: updateGenreSetModalProps,
    handlers: updateGenreSetModalHandlers,
  } = useUpdateGenreSetModal({ reload });
  const {
    modalProps: deleteGenreSetModalProps,
    handlers: deleteGenreSetModalHandlers,
  } = useDeleteGenreSetModal({ reload });

  useEffect(() => {
    reload();
  }, [reload]);

  // 実際のコンポーネント
  return (
    <Group position="center" pb="sm">
      <Paper w="100%" maw={800} p="xl" shadow="xs">
        <Title order={1}>ジャンルセット一覧</Title>
        <GenreSetFormModal title="新規ジャンルセット作成" submitText="作成" {...createGenreSetModalProps} />
        <GenreSetFormModal title="ジャンルセット情報更新" submitText="更新" {...updateGenreSetModalProps} />
        <DeleteGenreSetModal title="ジャンルセット削除" confirmText="削除" confirmColor="red" {...deleteGenreSetModalProps} />
        <GenreSetTable
          data={data?.getGenreSets ?? []}
          loading={(!data && loading) || !called}
          operations={{
            create: createGenreSetModalHandlers.open,
            update: updateGenreSetModalHandlers.open,
            delete: deleteGenreSetModalHandlers.open,
          }}
        />
      </Paper>
    </Group>
  );
};
