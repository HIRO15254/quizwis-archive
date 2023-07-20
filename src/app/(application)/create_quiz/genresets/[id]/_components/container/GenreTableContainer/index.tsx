'use client';

import { Group, Paper, Title } from '@mantine/core';
import React, { useEffect } from 'react';

import { useGetGenresLazyQuery } from 'gql';

import { useCreateGenreModal } from '../../../_hooks/useCreateGenreModal';
import { genreListToTree } from '../../../_util/genreListToTree';
import { CreateGenreModal } from '../../presenter/CreateGenreModal';
import { GenreTable } from '../../presenter/GenreTable';

interface GenreTableContainerProps {
  setId: string;
}

export const GenreTableContainer: React.FC<GenreTableContainerProps> = (props) => {
  const { setId } = props;

  const [reload, { data, loading }] = useGetGenresLazyQuery(
    {
      fetchPolicy: 'network-only',
      variables: { input: { genreSetDatabaseId: setId } },
    },
  );
  const {
    opened: createGenreModalOpened,
    handlers: createGenreModalHandlers,
    form: createGenreForm,
    onSubmit: onSubmitCreateGenreForm,
  } = useCreateGenreModal({ genreSetDatabaseId: setId, reload });

  useEffect(() => {
    reload();
  }, [setId, reload]);

  return (
    <Group position="center" pb="sm">
      <Paper w="100%" maw={800} p="xl" shadow="xs">
        <Title order={1}>ジャンル一覧</Title>
        <CreateGenreModal
          opened={createGenreModalOpened}
          onClose={createGenreModalHandlers.close}
          form={createGenreForm}
          onSubmit={onSubmitCreateGenreForm}
        />
        <GenreTable
          loading={!data && loading}
          data={genreListToTree(data?.getGenres || [])}
          openCreateGenreModal={createGenreModalHandlers.open}
        />
      </Paper>
    </Group>
  );
};
