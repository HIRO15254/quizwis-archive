'use client';

// 各種import
import {
  Title, Paper, Group, Anchor,
} from '@mantine/core';
import React, { useCallback, useEffect } from 'react';

import { useGetQuizCountLazyQuery, useGetQuizListQuery, useGetQuizzesLazyQuery } from 'gql';

import { useDeleteQuizModal } from '../../../_hooks/useDeleteQuizModal';
import { useInlineQuizEditor } from '../../../_hooks/useInlineQuizEditor';
import { usePageNation } from '../../../_hooks/usePageNation';
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

  const [reloadQuizzes, { loading, data, called }] = useGetQuizzesLazyQuery({
    fetchPolicy: 'network-only',
  });
  const [reloadQuizCount, { data: quizCountData }] = useGetQuizCountLazyQuery({
    fetchPolicy: 'network-only',
    variables: {
      input: {
        databaseId: listId,
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
    page, setPage, dataPerPage, setDataPerPage, maxPage,
  } = usePageNation({
    dataCount: quizCountData?.getQuizList.quizCount ?? 0,
    onChangePage: (newPage: number, newDataPerPage?: number) => {
      reloadQuizzes({
        variables: {
          input: {
            quizListDatabaseId: listId,
            take: newDataPerPage ?? dataPerPage,
            page: newPage,
          },
        },
      });
    },
  });

  const reload = useCallback(() => {
    reloadQuizzes({
      variables: {
        input: {
          quizListDatabaseId: listId,
          take: dataPerPage,
          page,
        },
      },
    });
    reloadQuizCount();
  }, [dataPerPage, listId, page, reloadQuizCount, reloadQuizzes]);

  useEffect(() => {
    reload();
  }, [reload]);

  const {
    onSubmit,
    editors,
    createQuiz,
    editingQuizId,
    setEditingQuizId,
    genreSelectorData,
    genreSelectorFormProps,
  } = useInlineQuizEditor({ reload, listId });
  const {
    opened: deleteQuizModalOpened,
    handlers: deleteQuizModalHandlers,
    onDelete: onDeleteQuiz,
  } = useDeleteQuizModal({ reload });

  // 実際のコンポーネント
  return (
    <Group position="center" pb="sm">
      <Paper w="100%" maw={1200} p="xl" shadow="xs">
        <Anchor href="/create_quiz/quizlist/list" unstyled>
          {'< 問題リスト一覧に戻る'}
        </Anchor>
        <Title order={1} mt="md">{quizListName?.getQuizList.name ?? ''}</Title>
        <DeleteQuizModal
          onClose={deleteQuizModalHandlers.close}
          opened={deleteQuizModalOpened}
          onDelete={onDeleteQuiz}
        />
        <QuizTable
          onSubmit={onSubmit}
          editors={editors}
          data={data?.getQuizzes ?? []}
          loading={(!data && loading) || !called}
          editingQuizId={editingQuizId}
          setEditingQuizId={setEditingQuizId}
          createNewQuiz={createQuiz}
          openDeleteQuizModal={deleteQuizModalHandlers.open}
          genreSelectorData={genreSelectorData ?? []}
          genreSelectorFormProps={genreSelectorFormProps}
          dataPerPage={dataPerPage}
          setDataPerPage={setDataPerPage}
          page={page}
          setNewPage={setPage}
          totalPage={maxPage}
        />
      </Paper>
    </Group>
  );
};
