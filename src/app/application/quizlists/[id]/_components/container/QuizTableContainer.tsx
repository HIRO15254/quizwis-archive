'use client';

import {
  Title, Group, Anchor, Container,
} from '@mantine/core';
import { useHotkeys } from '@mantine/hooks';
import Link from 'next/link';
import React from 'react';

import {
  useGetQuizzesQuery,
  useGetQuizListQuery,
} from 'gql';

import { useDeleteQuizModal } from '../../_hooks/useDeleteQuizModal';
import { usePagination } from '../../_hooks/usePagination';
import { useQuizFilter } from '../../_hooks/useQuizFilter';
import { QuizTable } from '../presenter/QuizTable';

interface QuizTableContainerProps {
  listId: string;
}

/**
 * クイズリストの一覧表示
 */
export const QuizTableContainer: React.FC<QuizTableContainerProps> = (props) => {
  const { listId } = props;

  const { loading, data, called } = useGetQuizzesQuery({
    fetchPolicy: 'network-only',
    variables: {
      input: {
        listId,
      },
    },
  });

  const quizListName = useGetQuizListQuery({
    variables: {
      input: {
        id: listId,
      },
    },
  }).data?.getQuizList.name;

  const {
    filteredData,
    genreFilterSelect,
  } = useQuizFilter({
    quizListId: listId,
    data: data?.getQuizzes ?? [],
  });

  const {
    pagination,
    dataPerPageSelect,
    pageData,
  } = usePagination({
    data: filteredData,
  });

  const {
    deleteQuizModal,
    deleteQuiz,
  } = useDeleteQuizModal();

  useHotkeys([
    ['mod+alt+N', () => {}, { preventDefault: true }],
  ]);

  return (
    <Container size="xl">
      <Anchor component={Link} href="./">
        {'< 問題リスト一覧に戻る'}
      </Anchor>
      <Group align="baseline">
        <Title order={1} mt="md">
          {quizListName ?? ''}
        </Title>
        {genreFilterSelect}
        {dataPerPageSelect}
      </Group>
      {deleteQuizModal}
      <QuizTable
        operations={{
          update: () => {},
          delete: deleteQuiz,
        }}
        data={pageData}
        loading={(!data && loading) || !called}
      />
      {pagination}
    </Container>
  );
};
