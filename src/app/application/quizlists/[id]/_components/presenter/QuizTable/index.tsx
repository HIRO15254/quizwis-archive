/* eslint-disable react/no-danger */

'use client';

import {
  Skeleton, Stack, Table, Text,
} from '@mantine/core';
import React from 'react';

import { QuizDataFragment } from 'gql';

import { QuizTableRow } from './Row';

interface Props {
  operations: {
    delete: (databaseId: string) => void;
    update: (databaseId: string) => void;
  }
  loading: boolean;
  data: QuizDataFragment[];
}

/**
 * クイズの一覧を表示するテーブル
 */
export const QuizTable: React.FC<Props> = (props) => {
  const {
    operations,
    data,
    loading,
  } = props;

  if (!loading && data.length === 0) {
    return (
      <Stack align="center" m="sm">
        <Text size="lg">問題がありません</Text>
      </Stack>
    );
  }
  return (
    <Skeleton visible={loading}>
      <Table
        my="md"
        highlightOnHover
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>問題文</Table.Th>
            <Table.Th style={{ width: 0, whiteSpace: 'nowrap' }}>文字数</Table.Th>
            <Table.Th style={{ width: '15%' }}>解答</Table.Th>
            <Table.Th style={{ width: '13rem' }}>ジャンル</Table.Th>
            <Table.Th style={{ width: 0 }}>追加情報</Table.Th>
            <Table.Th style={{ width: 0 }}>操作</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((quiz) => (
            <QuizTableRow
              key={quiz.id}
              data={quiz}
              operations={operations}
            />
          ))}
        </Table.Tbody>
      </Table>
    </Skeleton>
  );
};
