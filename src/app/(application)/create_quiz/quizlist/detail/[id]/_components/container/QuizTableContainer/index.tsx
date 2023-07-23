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
    paginationProps, dataPerPage, setDataPerPage, page,
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
    inlineQuizEditorProps,
    create,
    update,
    editingQuizId,
  } = useInlineQuizEditor({ reload, listId });

  const {
    modalProps: deleteQuizModalProps,
    handlers: deleteQuizModalHandlers,
  } = useDeleteQuizModal({ reload });

  // 実際のコンポーネント
  return (
    <Group position="center" pb="sm">
      <Paper w="100%" maw={1200} p="xl" shadow="xs">
        <Anchor href="/create_quiz/quizlist/list" unstyled>
          {'< 問題リスト一覧に戻る'}
        </Anchor>
        <Title order={1} mt="md">{quizListName?.getQuizList.name ?? ''}</Title>
        <DeleteQuizModal {...deleteQuizModalProps} title="問題削除" confirmText="削除" confirmColor="red" />
        <QuizTable
          inlineQuizEditorProps={inlineQuizEditorProps}
          operations={{
            create,
            update,
            delete: deleteQuizModalHandlers.open,
          }}
          editingQuizId={editingQuizId}
          data={data?.getQuizzes ?? []}
          loading={(!data && loading) || !called}
          dataPerPage={dataPerPage}
          setDataPerPage={setDataPerPage}
          paginationProps={paginationProps}
        />
      </Paper>
    </Group>
  );
};
