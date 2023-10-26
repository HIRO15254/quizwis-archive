'use client';

import {
  Title, Container,
} from '@mantine/core';
import { useHotkeys } from '@mantine/hooks';
import React from 'react';

import { useGetQuizListsQuery } from 'gql';

import { QuizListTable } from '../../_components/QuizListTable';
import { useCreateQuizListModal } from '../../_hooks/useCreateQuizListModal';
import { useDeleteQuizListModal } from '../../_hooks/useDeleteQuizListModal';
import { useUpdateQuizListModal } from '../../_hooks/useUpdateQuizListModal';

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
    <Container size="md">
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
    </Container>
  );
};
