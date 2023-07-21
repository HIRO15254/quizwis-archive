'use client';

// 各種import
import { Title, Paper, Group } from '@mantine/core';
import React, { useEffect } from 'react';

import { useGetQuizListsLazyQuery } from 'gql';

import { useCreateQuizListModal } from '../../../_hooks/useCreateQuizListModal';
import { useDeleteQuizListModal } from '../../../_hooks/useDeleteQuizListModal';
import { useUpdateQuizListModal } from '../../../_hooks/useUpdateQuizListModal';
import { CreateQuizListModal } from '../../presenter/CreateQuizListModal';
import { DeleteQuizListModal } from '../../presenter/DeleteQuizListModal';
import { QuizListTable } from '../../presenter/QuizListTable';
import { UpdateQuizListModal } from '../../presenter/UpdateQuizListModal';

/**
 * クイズリストの一覧表示
 */
export const QuizListTableContainer: React.FC = () => {
  const [reload, { loading, data }] = useGetQuizListsLazyQuery({ fetchPolicy: 'network-only' });
  const {
    opened: createQuizListModalOpened,
    handlers: createQuizListModalHandlers,
    form: createQuizListModalForm,
    onSubmit: onCreateQuizListFormSubmit,
    genreSets: createQuizListModalGenreSets,
  } = useCreateQuizListModal({ reload });
  const {
    opened: deleteQuizListModalOpened,
    handlers: deleteQuizListModalHandlers,
    name: deleteQuizListModalName,
    onDelete: onDeleteQuizList,
  } = useDeleteQuizListModal({ reload });
  const {
    opened: updateQuizListModalOpened,
    handlers: updateQuizListModalHandlers,
    onSubmit: onUpdateQuizListFormSubmit,
    form: updateQuizListModalForm,
    genreSets: updateQuizListModalGenreSets,
  } = useUpdateQuizListModal({ reload });

  useEffect(() => {
    reload();
  }, [reload]);

  // 実際のコンポーネント
  return (
    <Group position="center" pb="sm">
      <Paper w="100%" maw={800} p="xl" shadow="xs">
        <Title order={1}>問題リスト一覧</Title>
        <CreateQuizListModal
          opened={createQuizListModalOpened}
          form={createQuizListModalForm}
          onClose={createQuizListModalHandlers.close}
          onSubmit={onCreateQuizListFormSubmit}
          genreSets={createQuizListModalGenreSets()}
        />
        <DeleteQuizListModal
          name={deleteQuizListModalName}
          opened={deleteQuizListModalOpened}
          onClose={deleteQuizListModalHandlers.close}
          onDelete={onDeleteQuizList}
        />
        <UpdateQuizListModal
          opened={updateQuizListModalOpened}
          form={updateQuizListModalForm}
          onClose={updateQuizListModalHandlers.close}
          onSubmit={onUpdateQuizListFormSubmit}
          genreSets={updateQuizListModalGenreSets()}
        />
        <QuizListTable
          data={data?.getQuizLists ?? []}
          loading={loading}
          openCreateQuizListModal={createQuizListModalHandlers.open}
          openDeleteQuizListModal={deleteQuizListModalHandlers.open}
          openEditQuizListModal={updateQuizListModalHandlers.open}
        />
      </Paper>
    </Group>
  );
};
