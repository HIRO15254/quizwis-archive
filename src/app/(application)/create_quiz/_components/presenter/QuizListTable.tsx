'use client';

// 各種import
import {
  ActionIcon,
  Button, Group, Skeleton, Stack, Table, Text, Tooltip, useMantineTheme,
} from '@mantine/core';
import { IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';
import React from 'react';

import { colors } from 'styles/colors';

// Propsの型定義
interface QuizListData {
  id: string;
  name: string;
  description?: string | null | undefined;
}

interface QuizListListProps {
  loading: boolean;
  data: QuizListData[];
  openCreateQuizListModal: () => void;
}

/**
 * 説明
 */
export const QuizListTable: React.FC<QuizListListProps> = (props) => {
  const {
    data,
    loading,
    openCreateQuizListModal,
  } = props;
  const theme = useMantineTheme();

  // reactのhookの宣言
  // nextのhookの宣言
  // その他ライブラリのhookの宣言
  // 自作のhookの宣言

  // その他必要な関数の宣言

  // 部分的なコンポーネントの宣言
  const rows = data.map((quizList) => (
    <tr id={quizList.id}>
      <td>{quizList.name}</td>
      <td>
        <Text c="dimmed">
          {quizList.description || '説明文はありません'}
        </Text>
      </td>
      <td>
        <Group spacing={3}>
          <ActionIcon
            size="lg"
            color="blue"
            onClick={() => console.log('編集')}
          >
            <Tooltip label="編集">
              <IconPencil size="1.5rem" stroke={1.4} />
            </Tooltip>
          </ActionIcon>
          <ActionIcon
            size="lg"
            onClick={() => console.log('削除')}
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
        <Text size="lg">問題リストがありません</Text>
        <Button
          onClick={openCreateQuizListModal}
          leftIcon={<IconPlus />}
        >
          新規問題リスト
        </Button>
      </Stack>
    );
  }
  return (
    <Skeleton visible={loading} height={200}>
      <Group position="right">
        <Button
          onClick={openCreateQuizListModal}
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
            <td>リスト名</td>
            <td>説明</td>
            <td>操作</td>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </Table>
    </Skeleton>
  );
};
