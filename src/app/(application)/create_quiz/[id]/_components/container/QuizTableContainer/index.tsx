'use client';

// 各種import
import { Title, Paper, Group } from '@mantine/core';
import React, { useEffect } from 'react';

import { useGetQuizListQuery, useGetQuizzesLazyQuery } from 'gql';

import { useDeleteQuizModal } from '../../../_hooks/useDeleteQuizModal';
import { useInlineQuizEditor } from '../../../_hooks/useInlineQuizEditor';
import { DeleteQuizModal } from '../../presenter/DeleteQuizModal';
import { QuizTable } from '../../presenter/QuizTable';

interface QuizTableContainerProps {
  listId: string;
}

/**
 * クイズリストの一覧表示
 */
export const QuizTableContainer: React.FC<QuizTableContainerProps> = (props) => {
  const { listId } = props;

  const [reload, { loading, data }] = useGetQuizzesLazyQuery({
    fetchPolicy: 'network-only',
    variables: {
      input: {
        quizListDatabaseId: listId,
      },
    },
  });
  const { data: quizListName } = useGetQuizListQuery({
    variables: {
      input: {
        databaseId: listId,
      },
    },
  });

  const {
    onSubmit,
    editors,
    createQuiz,
    editingQuizId,
    setEditingQuizId,
  } = useInlineQuizEditor({ reload, listId });
  const {
    opened: deleteQuizModalOpened,
    handlers: deleteQuizModalHandlers,
    onDelete: onDeleteQuiz,
  } = useDeleteQuizModal({ reload });

  useEffect(() => {
    reload();
  }, [reload]);

  // 実際のコンポーネント
  return (
    <Group position="center" pb="sm">
      <Paper w="100%" maw={1200} p="xl" shadow="xs">
        <Title order={1}>{`〈${quizListName?.getQuizList.name}〉問題一覧`}</Title>
        <DeleteQuizModal
          onClose={deleteQuizModalHandlers.close}
          opened={deleteQuizModalOpened}
          onDelete={onDeleteQuiz}
        />
        <QuizTable
          onSubmit={onSubmit}
          editors={editors}
          data={data?.getQuizzes ?? []}
          loading={!data && loading}
          editingQuizId={editingQuizId}
          setEditingQuizId={setEditingQuizId}
          createNewQuiz={createQuiz}
          openDeleteQuizModal={deleteQuizModalHandlers.open}
        />
      </Paper>
    </Group>
  );
};
