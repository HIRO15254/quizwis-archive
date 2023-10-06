'use client';

// 各種import
import {
  Title, Paper, Group,
} from '@mantine/core';
import { useHotkeys } from '@mantine/hooks';
import React from 'react';

import { useGetQuizListsQuery } from 'gql';

import { useCreateQuizListModal } from '../../_hooks/useCreateQuizListModal';
import { useDeleteQuizListModal } from '../../_hooks/useDeleteQuizListModal';
import { useUpdateQuizListModal } from '../../_hooks/useUpdateQuizListModal';
import { QuizListTable } from '../presenter/QuizListTable';

/**
 * クイズリストの一覧表示
 */
export const QuizListTableContainer: React.FC = () => {
  const { loading, data, called } = useGetQuizListsQuery();
  const {
    createQuizList,
    createQuizListModal,
  } = useCreateQuizListModal();
  const {
    deleteQuizList,
    deleteQuizListModal,
  } = useDeleteQuizListModal();
  const {
    updateQuizList,
    updateQuizListModal,
  } = useUpdateQuizListModal();

  useHotkeys([
    ['mod+N', createQuizList, { preventDefault: true }],
  ]);

  return (
    <Group justify="flex-end" pb="sm">
      <Paper w="100%" maw={800} p="xl" shadow="xs">
        <Title order={1}>問題リスト一覧</Title>
        {createQuizListModal}
        {updateQuizListModal}
        {deleteQuizListModal}
        <QuizListTable
          data={data?.getQuizLists ?? []}
          loading={(!data && loading) || !called}
          operation={{
            create: createQuizList,
            delete: deleteQuizList,
            update: updateQuizList,
          }}
        />
      </Paper>
    </Group>
  );
};
