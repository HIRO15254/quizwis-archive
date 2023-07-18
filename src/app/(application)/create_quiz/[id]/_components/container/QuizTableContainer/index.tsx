'use client';

// 各種import
import { Title, Paper, Group } from '@mantine/core';
import React, { useEffect } from 'react';

import { useCreateQuizMutation, useGetQuizzesLazyQuery } from 'gql';

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
  const [createQuiz] = useCreateQuizMutation({
    variables: {
      input: {
        quizListDatabaseId: listId,
      },
    },
  });
  const {
    onSubmit,
    questionEditor,
    answerEditor,
    editingQuizId,
    setEditingQuizId,
  } = useInlineQuizEditor({ reload });
  const {
    opened: deleteQuizModalOpened,
    handlers: deleteQuizModalHandlers,
    onDelete: onDeleteQuiz,
  } = useDeleteQuizModal({ reload });

  const createNewQuiz = () => {
    createQuiz().then((created) => {
      setEditingQuizId(created.data?.createQuiz?.databaseId ?? null);
      reload();
    });
  };

  useEffect(() => {
    reload();
  }, [reload]);

  if (!questionEditor || !answerEditor) {
    return null;
  }

  // 実際のコンポーネント
  return (
    <Group position="center" pb="sm">
      <Paper w="100%" maw={1200} p="xl" shadow="xs">
        <Title order={1}>問題一覧</Title>
        <DeleteQuizModal
          onClose={deleteQuizModalHandlers.close}
          opened={deleteQuizModalOpened}
          onDelete={onDeleteQuiz}
        />
        <QuizTable
          onSubmit={onSubmit}
          questionEditor={questionEditor}
          answerEditor={answerEditor}
          data={data?.getQuizzes ?? []}
          loading={!data && loading}
          editingQuizId={editingQuizId}
          setEditingQuizId={setEditingQuizId}
          createNewQuiz={createNewQuiz}
          openDeleteQuizModal={deleteQuizModalHandlers.open}
        />
      </Paper>
    </Group>
  );
};
