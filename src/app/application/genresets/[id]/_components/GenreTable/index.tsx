import {
  Button, Skeleton, Stack, Table, Text,
} from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import React from 'react';

import { GenreTableRow } from './Row';
import { GenreTree } from '../../_util/genreListToTree';

interface Props {
  data: GenreTree[];
  loading: boolean;
  operations: {
    create: (parentId?: string) => void;
    update: (databaseId: string) => void;
    delete: (databaseId: string) => void;
  }
}

/**
 * ジャンル一覧ページのテーブル
 */
export const GenreTable: React.FC<Props> = (props) => {
  const {
    data,
    loading,
    operations,
  } = props;

  // reactのhookの宣言
  // 実際のコンポーネント
  if (data.length === 0 && !loading) {
    return (
      <Stack align="center" m="sm">
        <Text size="lg">ジャンルがありません</Text>
        <Button
          onClick={() => operations.create()}
          leftSection={<IconPlus />}
        >
          新規ジャンル
        </Button>
      </Stack>
    );
  }
  return (
    <Skeleton visible={loading}>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ジャンル名</Table.Th>
            <Table.Th>説明</Table.Th>
            <Table.Th style={{ width: 0, whiteSpace: 'nowrap' }}>比率</Table.Th>
            <Table.Th style={{ width: 0 }}>操作</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((genre) => (
            <GenreTableRow
              key={genre.data.id}
              genre={genre}
              nest={0}
              operations={operations}
            />
          ))}
        </Table.Tbody>
      </Table>
    </Skeleton>
  );
};
