'use client';

// 各種import
import { Title, Paper, Group } from '@mantine/core';
import React, { useEffect } from 'react';

import { useGetGenreSetsLazyQuery } from 'gql';

import { useCreateGenreSetModal } from '../../../_hooks/useCreateGenreSetModal';
import { useDeleteGenreSetModal } from '../../../_hooks/useDeleteGenreSetModal';
import { useUpdateGenreSetModal } from '../../../_hooks/useUpdateGenreSetModal';
import { CreateGenreSetModal } from '../../presenter/CreateGenreSetModal';
import { DeleteGenreSetModal } from '../../presenter/DeleteGenreSetModal';
import { GenreSetTable } from '../../presenter/GenreSetTable';
import { UpdateGenreSetModal } from '../../presenter/UpdateGenreSetModal';

/**
 * クイズリストの一覧表示
 */
export const GenreSetTableContainer: React.FC = () => {
  const [reload, { loading, data, called }] = useGetGenreSetsLazyQuery({ fetchPolicy: 'network-only' });
  const {
    opened: createGenreSetModalOpened,
    handlers: createGenreSetModalHandlers,
    form: createGenreSetForm,
    onSubmit: onSubmitCreateGenreSetForm,
  } = useCreateGenreSetModal({ reload });
  const {
    opened: deleteGenreSetModalOpened,
    handlers: deleteGenreSetModalHandlers,
    name: deleteGenreSetName,
    onDelete: onDeleteGenreSet,
  } = useDeleteGenreSetModal({ reload });
  const {
    opened: updateGenreSetModalOpened,
    handlers: updateGenreSetModalHandlers,
    onSubmit: onSubmitUpdateGenreSetForm,
    form: updateGenreSetForm,
  } = useUpdateGenreSetModal({ reload });

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
        <DeleteGenreSetModal
          name={deleteGenreSetName}
          opened={deleteGenreSetModalOpened}
          onClose={deleteGenreSetModalHandlers.close}
          onDelete={onDeleteGenreSet}
        />
        <UpdateGenreSetModal
          opened={updateGenreSetModalOpened}
          form={updateGenreSetForm}
          onClose={updateGenreSetModalHandlers.close}
          onSubmit={onSubmitUpdateGenreSetForm}
        />
        <GenreSetTable
          data={data?.getGenreSets ?? []}
          loading={(!data && loading) || !called}
          openCreateGenreSetModal={createGenreSetModalHandlers.open}
          openDeleteGenreSetModal={deleteGenreSetModalHandlers.open}
          openEditGenreSetModal={updateGenreSetModalHandlers.open}
        />
      </Paper>
    </Group>
  );
};
