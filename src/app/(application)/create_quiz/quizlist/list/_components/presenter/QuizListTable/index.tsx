'use client';

// 各種import
import {
  Anchor, Button, Group, Skeleton, Stack, Table, Text,
} from '@mantine/core';
import { IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';
import React from 'react';

import { TableActionIcon } from 'components/common/TableActionICon';

// Propsの型定義
interface QuizListData {
  id: string;
  databaseId: string;
  name: string;
  description?: string | null | undefined;
  genreSet?: {
    databaseId: string;
    name: string;
  } | null | undefined;
  goal: number;
  quizCount: number;
}

interface QuizListTableProps {
  loading: boolean;
  data: QuizListData[];
  operation: {
    create: () => void;
    delete: (databaseId: string) => void;
    update: (databaseId: string) => void;
  }
}

/**
 * 説明
 */
export const QuizListTable: React.FC<QuizListTableProps> = (props) => {
  const {
    data,
    loading,
    operation,
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
        { quizList.description && (
          <Text>
            {quizList.description}
          </Text>
        )}
        { !quizList.description && (
          <Text c="dimmed">
            説明文はありません
          </Text>
        )}
      </td>
      <td style={{ whiteSpace: 'nowrap' }}>
        { quizList.goal > 0 && (
          <Text>
            {`${quizList.quizCount}/${quizList.goal}`}
          </Text>
        )}
        { quizList.goal === 0 && (
          <Text>
            {quizList.quizCount}
          </Text>
        )}
      </td>
      <td>
        { quizList.genreSet && (
          <Anchor href={`../genreset/detail/${quizList.genreSet.databaseId}`}>
            {quizList.genreSet.name}
          </Anchor>
        )}
        { !quizList.genreSet && (
          <Text c="dimmed">
            未割り当て
          </Text>
        )}
      </td>
      <td>
        <Group spacing={3} noWrap>
          <TableActionIcon
            tooltip="編集"
            onClick={() => operation.update(quizList.databaseId)}
            Icon={IconPencil}
          />
          <TableActionIcon
            color="red"
            tooltip="削除"
            onClick={() => operation.delete(quizList.databaseId)}
            Icon={IconTrash}
          />
        </Group>
      </td>
    </tr>
  ));

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
          {rows}
        </tbody>
      </Table>
    </Skeleton>
  );
};
