'use client';

// 各種import
import {
  Title, Paper, Group, Anchor, Container,
} from '@mantine/core';
import { useHotkeys } from '@mantine/hooks';
import React, { useEffect } from 'react';

import {
  useGetQuizCountLazyQuery,
  useGetQuizListQuery,
  useGetQuizzesLazyQuery,
} from 'gql';

import { useDeleteQuizModal } from '../../_hooks/useDeleteQuizModal';
import { useInlineQuizEditor } from '../../_hooks/useInlineQuizEditor';
import { usePageNation } from '../../_hooks/usePageNation';
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

  const [
    getQuizzes,
    { loading, data, called },
  ] = useGetQuizzesLazyQuery({
    fetchPolicy: 'network-only',
  });

  const quizListName = useGetQuizListQuery({
    variables: {
      input: {
        id: listId,
      },
    },
  }).data?.getQuizList.name;

  const {
    filterData,
    genreFilterSelect,
  } = useQuizFilter({
    quizListId: listId,
  });

  const {
    pagination,
    dataPerPageSelect,
    paginationData,
    setDataCount,
    setPage,
  } = usePageNation();

  const [reloadQuizCount] = useGetQuizCountLazyQuery({
    variables: {
      input: {
        id: listId,
      },
      filter: filterData,
    },
    onCompleted: (result) => {
      setDataCount(result.getQuizList.quizCount);
    },
  });

  useEffect(() => {
    getQuizzes({
      variables: {
        input: {
          listId,
          filter: filterData,
          pagination: paginationData,
        },
      },
    });
    reloadQuizCount();
  }, [filterData, paginationData, listId, getQuizzes, reloadQuizCount]);

  useEffect(() => {
    setPage(1);
  }, [setPage, filterData]);

  const {
    inlineQuizEditorProps,
    create,
    update,
    editingQuizId,
  } = useInlineQuizEditor({ listId });

  const {
    deleteQuizModal,
    deleteQuiz,
  } = useDeleteQuizModal();

  useHotkeys([
    ['mod+alt+N', () => create(), { preventDefault: true }],
    ['mod+Enter', () => { if (editingQuizId) { inlineQuizEditorProps.operation.update(); } }, { preventDefault: true }],
    ['Escape', () => { if (editingQuizId) { inlineQuizEditorProps.operation.cancel(); } }, { preventDefault: true }],
  ]);

  // 実際のコンポーネント
  return (
    <Container size="xl">
      <Anchor href="/create_quiz/quizlist/list" unstyled>
        {'< 問題リスト一覧に戻る'}
      </Anchor>
      <Group align="baseline">
        <Title order={1} mt="md">
          {quizListName ?? ''}
        </Title>
      </Group>
      {deleteQuizModal}
      <QuizTable
        inlineQuizEditorProps={inlineQuizEditorProps}
        operations={{
          create,
          update,
          delete: deleteQuiz,
        }}
        editingQuizId={editingQuizId}
        data={data?.getQuizzes ?? []}
        loading={(!data && loading) || !called}
        dataPerPageSelect={dataPerPageSelect}
        genreFilterSelect={genreFilterSelect}
      />
      {pagination}
    </Container>
  );
};
