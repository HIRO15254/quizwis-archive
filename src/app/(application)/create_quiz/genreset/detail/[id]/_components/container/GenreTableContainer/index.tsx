'use client';

import {
  Anchor, Group, Paper, Title,
} from '@mantine/core';
import React, { useEffect } from 'react';

import { useGetGenreSetNameQuery, useGetGenresLazyQuery } from 'gql';

import { useCreateGenreModal } from '../../../_hooks/useCreateGenreModal';
import { useDeleteGenreModal } from '../../../_hooks/useDeleteGenreModal';
import { useUpdateGenreModal } from '../../../_hooks/useUpdateGenreModal';
import { genreListToTree } from '../../../_util/genreListToTree';
import { CreateGenreModal } from '../../presenter/CreateGenreModal';
import { DeleteGenreModal } from '../../presenter/DeleteGenreModal';
import { GenreTable } from '../../presenter/GenreTable';
import { UpdateGenreModal } from '../../presenter/UpdateGenreModal';

interface GenreTableContainerProps {
  setId: string;
}

export const GenreTableContainer: React.FC<GenreTableContainerProps> = (props) => {
  const { setId } = props;

  const [reload, { data, loading, called }] = useGetGenresLazyQuery(
    {
      fetchPolicy: 'network-only',
      variables: { input: { genreSetDatabaseId: setId } },
    },
  );
  const { data: genreSetName } = useGetGenreSetNameQuery({
    variables: {
      input: {
        databaseId: setId,
      },
    },
  });

  const {
    opened: createGenreModalOpened,
    handlers: createGenreModalHandlers,
    form: createGenreForm,
    onSubmit: onSubmitCreateGenreForm,
  } = useCreateGenreModal({ genreSetDatabaseId: setId, reload });
  const {
    opened: deleteGenreModalOpened,
    handlers: deleteGenreModalHandlers,
    name: deleteGenreName,
    onDelete: onDeleteGenre,
  } = useDeleteGenreModal({ reload });
  const {
    opened: updateGenreModalOpened,
    handlers: updateGenreModalHandlers,
    onSubmit: onSubmitUpdateGenreForm,
    form: updateGenreForm,
  } = useUpdateGenreModal({ reload });

  useEffect(() => {
    reload();
  }, [setId, reload]);

  return (
    <Group position="center" pb="sm">
      <Paper w="100%" maw={800} p="xl" shadow="xs">
        <Anchor href="/create_quiz/genreset/list" unstyled>
          {'< ジャンルセット一覧に戻る'}
        </Anchor>
        <Title order={1} mt="md">{genreSetName?.getGenreSet.name ?? ''}</Title>
        <CreateGenreModal
          opened={createGenreModalOpened}
          onClose={createGenreModalHandlers.close}
          form={createGenreForm}
          onSubmit={onSubmitCreateGenreForm}
        />
        <DeleteGenreModal
          name={deleteGenreName}
          opened={deleteGenreModalOpened}
          onClose={deleteGenreModalHandlers.close}
          onDelete={onDeleteGenre}
        />
        <UpdateGenreModal
          opened={updateGenreModalOpened}
          onClose={updateGenreModalHandlers.close}
          form={updateGenreForm}
          onSubmit={onSubmitUpdateGenreForm}
        />
        <GenreTable
          loading={(!data && loading) || !called}
          data={genreListToTree(data?.getGenres || [])}
          openCreateGenreModal={createGenreModalHandlers.open}
          openDeleteGenreModal={deleteGenreModalHandlers.open}
          openUpdateGenreModal={updateGenreModalHandlers.open}
        />
      </Paper>
    </Group>
  );
};
