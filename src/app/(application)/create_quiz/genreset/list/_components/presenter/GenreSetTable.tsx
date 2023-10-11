'use client';

// 各種import
import {
  Button, Group, Skeleton, Stack, Table, Text,
} from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import React from 'react';

import { GenreSetDataFragment } from 'gql';

import { GenreSetTableRow } from './GenreSetTableRow';

interface Props {
  loading: boolean;
  data: GenreSetDataFragment[];
  operations: {
    create: () => void;
    delete: (id: string) => void;
    update: (id: string) => void;
  };
}

/**
 * 説明
 */
export const GenreSetTable: React.FC<Props> = (props) => {
  const {
    data,
    loading,
    operations,
  } = props;

  if (!loading && data.length === 0) {
    return (
      <Stack align="center" m="sm">
        <Text size="lg">ジャンルセットがありません</Text>
        <Button
          onClick={operations.create}
          leftSection={<IconPlus />}
        >
          新規ジャンルセット
        </Button>
      </Stack>
    );
  }
  return (
    <Skeleton visible={loading}>
      <Group>
        <Button
          onClick={operations.create}
          leftSection={<IconPlus />}
        >
          新規ジャンルセット
        </Button>
      </Group>
      <Table
        mt="md"
        highlightOnHover
      >
        <thead>
          <tr>
            <th>セット名</th>
            <th>説明</th>
            <th style={{ width: 0 }}>操作</th>
          </tr>
        </thead>
        <tbody>
          {data.map((quizList) => (
            <GenreSetTableRow
              key={quizList.id}
              data={quizList}
              operations={{
                update: () => operations.update(quizList.id),
                delete: () => operations.delete(quizList.id),
              }}
            />
          ))}
        </tbody>
      </Table>
    </Skeleton>
  );
};
