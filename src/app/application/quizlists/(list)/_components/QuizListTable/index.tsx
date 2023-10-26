import {
  Button, Skeleton, Stack, Table, Text,
} from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import React from 'react';

import { QuizListDataFragment } from 'gql';

import { QuizListTableRow } from './Row';

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
 * 問題リストの一覧表示
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
          leftSection={<IconPlus />}
        >
          新規問題リスト
        </Button>
      </Stack>
    );
  }
  return (
    <Skeleton visible={loading}>
      <Table
        mt="md"
        highlightOnHover
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>リスト名</Table.Th>
            <Table.Th>説明</Table.Th>
            <Table.Th style={{ width: 0, whiteSpace: 'nowrap' }}>問題数</Table.Th>
            <Table.Th>使用ジャンルセット</Table.Th>
            <Table.Th style={{ width: 0 }}>操作</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
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
        </Table.Tbody>
      </Table>
    </Skeleton>
  );
};
