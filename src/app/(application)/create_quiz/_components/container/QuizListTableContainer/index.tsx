'use client';

// 各種import
import { Title } from '@mantine/core';
import React, { useEffect } from 'react';

import { useGetQuizListsLazyQuery } from 'gql';

import { useCreateQuizListModal } from '../../../_hooks/useCreateQuizListModal';
import { CreateQuizListModal } from '../../presenter/CreateQuizListModal';
import { QuizListTable } from '../../presenter/QuizListTable';

/**
 * クイズリストの一覧表示
 */
export const QuizListTableContainer: React.FC = () => {
  const [reload, { loading, data }] = useGetQuizListsLazyQuery({ fetchPolicy: 'network-only' });
  const {
    opened: createQuizListModalOpened,
    handlers: createQuizListModalHandlers,
    form: createQuizListModalForm,
    onSubmit: onCreateQuizListFormSubmit,
  } = useCreateQuizListModal({ reload });

  useEffect(() => {
    reload();
  }, [reload]);

  // 実際のコンポーネント
  return (
    <>
      <Title order={1}>問題リスト一覧</Title>
      <CreateQuizListModal
        opened={createQuizListModalOpened}
        form={createQuizListModalForm}
        onClose={createQuizListModalHandlers.close}
        onSubmit={onCreateQuizListFormSubmit}
      />
      <QuizListTable
        data={data?.getQuizLists ?? []}
        loading={loading}
        openCreateQuizListModal={createQuizListModalHandlers.open}
      />
    </>
  );
};
