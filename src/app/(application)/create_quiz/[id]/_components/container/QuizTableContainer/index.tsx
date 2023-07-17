'use client';

// 各種import
import { Title, Paper, Group } from '@mantine/core';
import React, { useEffect } from 'react';

import { useGetQuizzesLazyQuery } from 'gql';

import { useInlineQuizEditor } from '../../../_hooks/useInlineQuizEditor';
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
  const { form, editingQuizId, setEditingQuizId } = useInlineQuizEditor();

  useEffect(() => {
    reload();
  }, [reload]);

  // 実際のコンポーネント
  return (
    <Group position="center" pb="sm">
      <Paper w="100%" maw={1200} p="xl" shadow="xs">
        <Title order={1}>問題一覧</Title>
        <QuizTable
          form={form}
          data={data?.getQuizzes ?? []}
          loading={loading}
          editingQuizId={editingQuizId}
          setEditingQuizId={setEditingQuizId}
          createNewQuiz={() => { }}
          openDeleteQuizModal={() => { }}
        />
      </Paper>
    </Group>
  );
};
