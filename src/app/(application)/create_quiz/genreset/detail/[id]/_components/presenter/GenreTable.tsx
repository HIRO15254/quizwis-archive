// "use client";

// 各種import
import {
  Button, Group, Skeleton, Stack, Table, Text,
} from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import React from 'react';

import { GenreTableRow } from './GenreTableRow';
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
      <Group justify="flex-end" pb="sm">
        <Button
          onClick={() => operations.create()}
          leftSection={<IconPlus />}
        >
          ジャンルを追加
        </Button>
      </Group>
      <Table>
        <thead>
          <tr>
            <th style={{ width: 'fix-content' }}>ジャンル名</th>
            <th>説明</th>
            <th style={{ width: 0, whiteSpace: 'nowrap' }}>比率</th>
            <th style={{ width: 0 }}>操作</th>
          </tr>
        </thead>
        <tbody>
          {data.map((genre) => (
            <GenreTableRow
              key={genre.data.id}
              genre={genre}
              nest={0}
              operations={operations}
            />
          ))}
        </tbody>
      </Table>
    </Skeleton>
  );
};
