'use client';

import {
  Title, Container,
} from '@mantine/core';
import { useHotkeys } from '@mantine/hooks';
import React from 'react';

import { useGetGenreSetsQuery } from 'gql';

import { GenreSetTable } from '../../_components/GenreSetTable';
import { useCreateGenreSetModal } from '../../_hooks/useCreateGenreSetModal';
import { useDeleteGenreSetModal } from '../../_hooks/useDeleteGenreSetModal';
import { useUpdateGenreSetModal } from '../../_hooks/useUpdateGenreSetModal';

/**
 * クイズリストの一覧表示
 */
export const GenreSetTableContainer: React.FC = () => {
  const {
    loading,
    data,
    called,
  } = useGetGenreSetsQuery({ fetchPolicy: 'network-only' });
  const {
    createGenreSetModal,
    createGenreSet,
  } = useCreateGenreSetModal();
  const {
    updateGenreSetModal,
    updateGenreSet,
  } = useUpdateGenreSetModal();
  const {
    deleteGenreSetModal,
    deleteGenreSet,
  } = useDeleteGenreSetModal();

  useHotkeys([
    ['mod+N', () => createGenreSet(), { preventDefault: true }],
  ]);

  // 実際のコンポーネント
  return (
    <Container size="md">
      <Title order={1}>ジャンルセット一覧</Title>
      {createGenreSetModal}
      {updateGenreSetModal}
      {deleteGenreSetModal}
      <GenreSetTable
        data={data?.getGenreSets ?? []}
        loading={(!data && loading) || !called}
        operations={{
          create: createGenreSet,
          update: updateGenreSet,
          delete: deleteGenreSet,
        }}
      />
    </Container>
  );
};
