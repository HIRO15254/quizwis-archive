'use client';

// 各種import
import {
  Anchor, Button, Group, Skeleton, Stack, Table, Text,
} from '@mantine/core';
import { IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';
import React from 'react';

import { TableActionIcon } from 'components/common/TableActionICon';

// Propsの型定義
interface GenreSetData {
  id: string;
  databaseId: string;
  name: string;
  description?: string | null | undefined;
}

interface GenreSetTableProps {
  loading: boolean;
  data: GenreSetData[];
  operations: {
    create: () => void;
    delete: (databaseId: string) => void;
    update: (databaseId: string) => void;
  };
}

/**
 * 説明
 */
export const GenreSetTable: React.FC<GenreSetTableProps> = (props) => {
  const {
    data,
    loading,
    operations,
  } = props;

  // 部分的なコンポーネントの宣言
  const rows = data.map((quizList) => (
    <tr key={quizList.id}>
      <td>
        <Anchor href={`./detail/${quizList.databaseId}`}>
          {quizList.name}
        </Anchor>
      </td>
      <td>
        { quizList.description
          && (
          <Text>
            {quizList.description}
          </Text>
          )}
        { !quizList.description
          && (
          <Text c="dimmed">
            説明文はありません
          </Text>
          )}
      </td>
      <td>
        <Group spacing={3} noWrap>
          <TableActionIcon
            tooltip="編集"
            onClick={() => operations.update(quizList.databaseId)}
            Icon={IconPencil}
          />
          <TableActionIcon
            tooltip="削除"
            color="red"
            onClick={() => operations.delete(quizList.databaseId)}
            Icon={IconTrash}
          />
        </Group>
      </td>
    </tr>
  ));

  if (!loading && data.length === 0) {
    return (
      <Stack align="center" m="sm">
        <Text size="lg">ジャンルセットがありません</Text>
        <Button
          onClick={operations.create}
          leftIcon={<IconPlus />}
        >
          新規ジャンルセット
        </Button>
      </Stack>
    );
  }
  return (
    <Skeleton visible={loading}>
      <Group position="right">
        <Button
          onClick={operations.create}
          leftIcon={<IconPlus />}
        >
          新規ジャンルセット
        </Button>
      </Group>
      <Table
        mt="md"
        highlightOnHover
        fontSize="md"
      >
        <thead>
          <tr>
            <th>セット名</th>
            <th>説明</th>
            <th style={{ width: 0 }}>操作</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </Table>
    </Skeleton>
  );
};
