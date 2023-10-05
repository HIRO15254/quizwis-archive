'use client';

import {
  Anchor, Group, Paper, Title,
} from '@mantine/core';
import { useHotkeys } from '@mantine/hooks';
import { encodeGlobalID } from '@pothos/plugin-relay';
import React from 'react';

import { useGetGenreDetailPageDataQuery } from 'gql';

import { useCreateGenreModal } from '../../_hooks/useCreateGenreModal';
import { useDeleteGenreModal } from '../../_hooks/useDeleteGenreModal';
import { useUpdateGenreModal } from '../../_hooks/useUpdateGenreModal';
import { genreListToTree } from '../../_util/genreListToTree';
import { GenreTable } from '../presenter/GenreTable';

interface Props {
  genreSetDatabaseId: string;
}

export const GenreTableContainer: React.FC<Props> = (props) => {
  const { genreSetDatabaseId } = props;
  const genreSetId = encodeGlobalID('GenreSet', genreSetDatabaseId);

  const {
    data,
    loading,
    called,
  } = useGetGenreDetailPageDataQuery({
    variables: { input: { id: genreSetId } },
  });

  const {
    deleteGenreModal,
    deleteGenre,
  } = useDeleteGenreModal();
  const {
    createGenreModal,
    createGenre,
  } = useCreateGenreModal({ genreSetId });
  const {
    updateGenreModal,
    updateGenre,
  } = useUpdateGenreModal();

  const genresData = data?.getGenreSet.genres;
  const genreSetName = data?.getGenreSet.name;

  useHotkeys([
    ['mod+N', () => createGenre(), { preventDefault: true }],
  ]);

  return (
    <Group position="center" pb="sm">
      <Paper w="100%" maw={800} p="xl" shadow="xs">
        <Anchor href="/create_quiz/genreset/list" unstyled>
          {'< ジャンルセット一覧に戻る'}
        </Anchor>
        <Title order={1} mt="md">{genreSetName ?? ''}</Title>
        {deleteGenreModal}
        {createGenreModal}
        {updateGenreModal}
        <GenreTable
          loading={(!data && loading) || !called}
          data={genreListToTree(genresData || [])}
          operations={{
            create: createGenre,
            update: updateGenre,
            delete: deleteGenre,
          }}
        />
      </Paper>
    </Group>
  );
};
