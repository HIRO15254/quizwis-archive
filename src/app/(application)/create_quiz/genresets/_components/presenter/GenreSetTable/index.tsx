'use client';

// 各種import
import {
  ActionIcon,
  Anchor,
  Button, Group, Skeleton, Stack, Table, Text, Tooltip,
} from '@mantine/core';
import { IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';
import React from 'react';

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
  openCreateGenreSetModal: () => void;
  openDeleteGenreSetModal: (databaseId: string) => void;
  openEditGenreSetModal: (databaseId: string) => void;
}

/**
 * 説明
 */
export const GenreSetTable: React.FC<GenreSetTableProps> = (props) => {
  const {
    data,
    loading,
    openCreateGenreSetModal,
    openDeleteGenreSetModal,
    openEditGenreSetModal,
  } = props;

  // 部分的なコンポーネントの宣言
  const rows = data.map((quizList) => (
    <tr key={quizList.id}>
      <td>
        <Anchor href={`genresets/${quizList.databaseId}`}>
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
        <Group spacing={3}>
          <ActionIcon
            size="lg"
            color="blue"
            onClick={() => openEditGenreSetModal(quizList.databaseId)}
          >
            <Tooltip label="編集">
              <IconPencil size="1.5rem" stroke={1.4} />
            </Tooltip>
          </ActionIcon>
          <ActionIcon
            size="lg"
            onClick={() => openDeleteGenreSetModal(quizList.databaseId)}
            color="red"
          >
            <Tooltip label="削除">
              <IconTrash size="1.5rem" stroke={1.4} />
            </Tooltip>
          </ActionIcon>
        </Group>
      </td>
    </tr>
  ));

  // 実際のコンポーネント
  if (!loading && data.length === 0) {
    return (
      <Stack align="center" m="sm">
        <Text size="lg">ジャンルセットがありません</Text>
        <Button
          onClick={openCreateGenreSetModal}
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
          onClick={openCreateGenreSetModal}
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
            <th style={{ minWidth: 80 }}>セット名</th>
            <th>説明</th>
            <th style={{ width: 120 }}>操作</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </Table>
    </Skeleton>
  );
};
