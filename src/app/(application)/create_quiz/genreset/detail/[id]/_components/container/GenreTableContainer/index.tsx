'use client';

import {
  Anchor, Group, Paper, Title,
} from '@mantine/core';
import { useHotkeys } from '@mantine/hooks';
import React, { useEffect } from 'react';

import { useGetGenreDetailPageDataLazyQuery } from 'gql';

import { useCreateGenreModal } from '../../../_hooks/useCreateGenreModal';
import { useDeleteGenreModal } from '../../../_hooks/useDeleteGenreModal';
import { useUpdateGenreModal } from '../../../_hooks/useUpdateGenreModal';
import { genreListToTree } from '../../../_util/genreListToTree';
import { DeleteGenreModal } from '../../presenter/DeleteGenreModal';
import { GenreFormModal } from '../../presenter/GenreFormModal';
import { GenreTable } from '../../presenter/GenreTable';

interface GenreTableContainerProps {
  setId: string;
}

export const GenreTableContainer: React.FC<GenreTableContainerProps> = (props) => {
  const { setId } = props;

  const [reload, { data, loading, called }] = useGetGenreDetailPageDataLazyQuery({
    fetchPolicy: 'cache-and-network',
    variables: { input: { databaseId: setId } },
  });

  const {
    modalProps: deleteGenreModalProps,
    handlers: deleteGenreModalHandlers,
  } = useDeleteGenreModal({ reload });
  const {
    genreFormModalProps: createGenreModalProps,
    handlers: createGenreModalHandlers,
  } = useCreateGenreModal({ genreSetDatabaseId: setId, reload });
  const {
    genreFormModalProps: updateGenreModalProps,
    handlers: updateGenreModalHandlers,
  } = useUpdateGenreModal({ reload });

  const genresData = data?.getGenreSet.genres;
  const genreSetName = data?.getGenreSet.name;

  useEffect(() => {
    reload();
  }, [setId, reload]);

  useHotkeys([
    ['mod+alt+N', () => createGenreModalHandlers.open(setId), { preventDefault: true }],
  ]);

  return (
    <Group position="center" pb="sm">
      <Paper w="100%" maw={800} p="xl" shadow="xs">
        <Anchor href="/create_quiz/genreset/list" unstyled>
          {'< ジャンルセット一覧に戻る'}
        </Anchor>
        <Title order={1} mt="md">{genreSetName ?? ''}</Title>
        <DeleteGenreModal title="ジャンル削除" confirmText="削除" {...deleteGenreModalProps} />
        <GenreFormModal title="新規ジャンル作成" submitText="作成" {...createGenreModalProps} />
        <GenreFormModal title="ジャンル情報更新" submitText="更新" {...updateGenreModalProps} />
        <GenreTable
          loading={(!data && loading) || !called}
          data={genreListToTree(genresData || [])}
          operations={{
            create: createGenreModalHandlers.open,
            update: updateGenreModalHandlers.open,
            delete: deleteGenreModalHandlers.open,
          }}
        />
      </Paper>
    </Group>
  );
};
