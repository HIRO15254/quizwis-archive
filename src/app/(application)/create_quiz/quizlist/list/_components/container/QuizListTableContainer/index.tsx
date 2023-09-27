'use client';

// 各種import
import {
  Title, Paper, Group,
} from '@mantine/core';
import { useHotkeys } from '@mantine/hooks';
import React, { useEffect } from 'react';

import { useGetGenreSetsForQuizListQuery, useGetQuizListsLazyQuery } from 'gql';

import { useCreateQuizListModal } from '../../../_hooks/useCreateQuizListModal';
import { useDeleteQuizListModal } from '../../../_hooks/useDeleteQuizListModal';
import { useUpdateQuizListModal } from '../../../_hooks/useUpdateQuizListModal';
import { DeleteQuizListModal } from '../../presenter/DeleteQuizListModal';
import { QuizListFormModal } from '../../presenter/QuizListFormModal';
import { QuizListTable } from '../../presenter/QuizListTable';

/**
 * クイズリストの一覧表示
 */
export const QuizListTableContainer: React.FC = () => {
  const [
    reload, { loading, data, called },
  ] = useGetQuizListsLazyQuery({ fetchPolicy: 'network-only' });
  const { data: genreSetQueryData } = useGetGenreSetsForQuizListQuery({ fetchPolicy: 'cache-and-network' });
  const {
    modalProps: createQuizListModalProps,
    handlers: createQuizListModalHandlers,
  } = useCreateQuizListModal({ reload });
  const {
    modalProps: deleteQuizListModalProps,
    handlers: deleteQuizListModalHandlers,
  } = useDeleteQuizListModal({ reload });
  const {
    modalProps: updateQuizListModalProps,
    handlers: updateQuizListModalHandlers,
  } = useUpdateQuizListModal({ reload });

  useEffect(() => {
    reload();
  }, [reload]);

  const genreSets = [{ value: '', label: 'なし' }].concat(
    genreSetQueryData?.getGenreSets.map((genreSet) => ({
      value: genreSet.databaseId,
      label: genreSet.name,
    })) ?? [],
  );

  useHotkeys([
    ['mod+alt+N', () => createQuizListModalHandlers.open(), { preventDefault: true }],
  ]);

  return (
    <Group position="center" pb="sm">
      <Paper w="100%" maw={800} p="xl" shadow="xs">
        <Title order={1}>問題リスト一覧</Title>
        <QuizListFormModal
          title="新規問題リスト"
          submitText="作成"
          genreSets={genreSets}
          {...createQuizListModalProps}
        />
        <QuizListFormModal
          title="問題リストの編集"
          submitText="更新"
          genreSets={genreSets}
          {...updateQuizListModalProps}
        />
        <DeleteQuizListModal
          title="問題リストの削除"
          confirmText="削除"
          confirmColor="red"
          {...deleteQuizListModalProps}
        />
        <QuizListTable
          data={data?.getQuizLists ?? []}
          loading={(!data && loading) || !called}
          operation={{
            create: createQuizListModalHandlers.open,
            delete: deleteQuizListModalHandlers.open,
            update: updateQuizListModalHandlers.open,
          }}
        />
      </Paper>
    </Group>
  );
};
