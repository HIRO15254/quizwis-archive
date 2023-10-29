import {
  Button, Skeleton, Stack, Table, Text,
} from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import React from 'react';

import { GenreSetDataFragment } from 'gql';

import { GenreSetTableRow } from './Row';

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
      <Table
        mt="md"
        highlightOnHover
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>セット名</Table.Th>
            <Table.Th>説明</Table.Th>
            <Table.Th style={{ width: 0 }}>操作</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
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
        </Table.Tbody>
      </Table>
    </Skeleton>
  );
};
