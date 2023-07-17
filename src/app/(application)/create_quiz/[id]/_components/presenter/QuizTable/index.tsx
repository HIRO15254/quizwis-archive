'use client';

// 各種import
import {
  ActionIcon,
  Button, Group, Skeleton, Stack, Table, Text, Tooltip, useMantineTheme,
} from '@mantine/core';
import { UseFormReturnType, useForm } from '@mantine/form';
import {
  IconArrowsSplit, IconBook2, IconNote, IconPencil, IconPlus, IconTrash,
} from '@tabler/icons-react';
import React from 'react';

import { colors } from 'styles/colors';

import { InlineQuizEditor } from '../InlineQuizEditor';

// Propsの型定義
interface QuizData {
  id: string;
  databaseId: string;
  question?: string | null | undefined;
  answer?: string | null | undefined;
  otherAnswer?: string | null | undefined;
  explanation?: string | null | undefined;
  source?: string | null | undefined;
}

interface QuizTableProps {
  form: UseFormReturnType<any>;
  loading: boolean;
  data: QuizData[];
  editingQuizId: string | null | undefined;
  setEditingQuizId: (databaseId: string) => void;
  createNewQuiz: () => void;
  openDeleteQuizModal: (databaseId: string) => void;
}

/**
 * 説明
 */
export const QuizTable: React.FC<QuizTableProps> = (props) => {
  const {
    form,
    data,
    loading,
    editingQuizId,
    setEditingQuizId,
    createNewQuiz,
    openDeleteQuizModal,
  } = props;

  const theme = useMantineTheme();

  // 部分的なコンポーネントの宣言
  const rows = data.map((quiz) => {
    if (quiz.databaseId === editingQuizId) {
      return (
        <tr key={quiz.id}>
          <td colSpan={5}>
            <InlineQuizEditor
              key={quiz.id}
              form={form}
            />
          </td>
        </tr>
      );
    }
    return (
      <tr key={quiz.id}>
        <td>{quiz.question}</td>
        <td>{quiz.answer}</td>
        <td>
          <Group spacing={3}>
            <Tooltip label={quiz.otherAnswer ? '別解あり' : '別解なし'}>
              <IconArrowsSplit size="1.5rem" stroke={1.4} color={quiz.otherAnswer ? colors.active(theme) : colors.disabled(theme)} />
            </Tooltip>
            <Tooltip label={quiz.explanation ? '解説あり' : '解説なし'}>
              <IconNote size="1.5rem" stroke={1.4} color={quiz.explanation ? colors.active(theme) : colors.disabled(theme)} />
            </Tooltip>
            <Tooltip label={quiz.source ? '出典記載済み' : '出典未記載'}>
              <IconBook2 size="1.5rem" stroke={1.4} color={quiz.source ? colors.active(theme) : colors.disabled(theme)} />
            </Tooltip>
          </Group>
        </td>
        <td>
          <Group spacing={3}>
            <ActionIcon
              size="lg"
              color="blue"
              onClick={() => setEditingQuizId(quiz.databaseId)}
            >
              <Tooltip label="編集">
                <IconPencil size="1.5rem" stroke={1.4} />
              </Tooltip>
            </ActionIcon>
            <ActionIcon
              size="lg"
              onClick={() => openDeleteQuizModal(quiz.databaseId)}
              color="red"
            >
              <Tooltip label="削除">
                <IconTrash size="1.5rem" stroke={1.4} />
              </Tooltip>
            </ActionIcon>
          </Group>
        </td>
      </tr>
    );
  });

  // 実際のコンポーネント
  if (!loading && data.length === 0) {
    return (
      <Stack align="center" m="sm">
        <Text size="lg">問題がありません</Text>
        <Button
          onClick={createNewQuiz}
          leftIcon={<IconPlus />}
        >
          問題を追加
        </Button>
      </Stack>
    );
  }
  return (
    <Skeleton visible={loading}>
      <Group position="right">
        <Button
          onClick={createNewQuiz}
          leftIcon={<IconPlus />}
        >
          問題を追加
        </Button>
      </Group>
      <Table
        mt="md"
        highlightOnHover
        fontSize="md"
      >
        <thead>
          <tr>
            <th style={{ minWidth: 240 }}>問題文</th>
            <th>解答</th>
            <th>追加情報</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </Table>
    </Skeleton>
  );
};
