'use client';

// 各種import
import {
  Button, Group, Skeleton, Stack, Table, Text,
} from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import React from 'react';

import { QuizListDataFragment } from 'gql';

import { QuizListTableRow } from './QuizListTableRow';

// Propsの型定義

interface Props {
  loading: boolean;
  data: QuizListDataFragment[];
  operation: {
    create: () => void;
    delete: (id: string) => void;
    update: (id: string) => void;
  }
}

/**
 * 説明
 */
export const QuizListTable: React.FC<Props> = (props) => {
  const {
    data,
    loading,
    operation,
  } = props;

  // 実際のコンポーネント
  if (!loading && data.length === 0) {
    return (
      <Stack align="center" m="sm">
        <Text size="lg">問題リストがありません</Text>
        <Button
          onClick={operation.create}
          leftIcon={<IconPlus />}
        >
          新規問題リスト
        </Button>
      </Stack>
    );
  }
  return (
    <Skeleton visible={loading}>
      <Group position="right">
        <Button
          onClick={operation.create}
          leftIcon={<IconPlus />}
        >
          新規問題リスト
        </Button>
      </Group>
      <Table
        mt="md"
        highlightOnHover
        fontSize="md"
      >
        <thead>
          <tr>
            <th>リスト名</th>
            <th>説明</th>
            <th style={{ width: 0, whiteSpace: 'nowrap' }}>問題数</th>
            <th>使用ジャンルセット</th>
            <th style={{ width: 0 }}>操作</th>
          </tr>
        </thead>
        <tbody>
          {data.map((quizList) => (
            <QuizListTableRow
              key={quizList.id}
              data={quizList}
              operation={{
                delete: () => operation.delete(quizList.id),
                update: () => operation.update(quizList.id),
              }}
            />
          ))}
        </tbody>
      </Table>
    </Skeleton>
  );
};
