/* eslint-disable react/no-danger */

'use client';

// 各種import
import {
  ActionIcon,
  Button, Group, Skeleton, Stack, Table, Text, Tooltip, useMantineTheme,
} from '@mantine/core';
import {
  IconArrowsSplit, IconBook2, IconCheck, IconNote, IconPencil, IconPlus, IconTrash,
} from '@tabler/icons-react';
import { Editor } from '@tiptap/react';
import React from 'react';

import { colors } from 'styles/colors';

import { LayoutProps } from '../../../../../../../../.next/types/app/api/auth/[...nextauth]/route';
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
  onSubmit: () => void;
  questionEditor: Editor;
  answerEditor: Editor;
  loading: boolean;
  data: QuizData[];
  editingQuizId: string | null | undefined;
  setEditingQuizId: (databaseId: string, quiz?: { question: string, answer: string }) => void;
  createNewQuiz: () => void;
  openDeleteQuizModal: (databaseId: string) => void;
}

/**
 * 説明
 */
export const QuizTable: React.FC<QuizTableProps> = (props) => {
  const {
    onSubmit,
    questionEditor,
    answerEditor,
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
          <td>
            <InlineQuizEditor
              editor={questionEditor}
            />
          </td>
          <td>
            <InlineQuizEditor
              editor={answerEditor}
            />
          </td>
          <td>
            <Group spacing={3}>
              <Tooltip label={quiz.otherAnswer ? quiz.otherAnswer : '別解なし'}>
                <IconArrowsSplit size="1.5rem" stroke={1.4} color={quiz.otherAnswer ? colors.active(theme) : colors.disabled(theme)} />
              </Tooltip>
              <Tooltip label={quiz.explanation ? quiz.explanation : '解説なし'}>
                <IconNote size="1.5rem" stroke={1.4} color={quiz.explanation ? colors.active(theme) : colors.disabled(theme)} />
              </Tooltip>
              <Tooltip label={quiz.source ? quiz.source : '出典未記載'}>
                <IconBook2 size="1.5rem" stroke={1.4} color={quiz.source ? colors.active(theme) : colors.disabled(theme)} />
              </Tooltip>
            </Group>
          </td>
          <td>
            <ActionIcon
              size="lg"
              color="green"
              onClick={onSubmit}
            >
              <Tooltip label="確定">
                <IconCheck size="1.5rem" stroke={1.4} />
              </Tooltip>
            </ActionIcon>
          </td>
        </tr>
      );
    }
    return (
      <tr key={quiz.id}>
        <td>
          <div dangerouslySetInnerHTML={{ __html: quiz.question ?? '' }} />
        </td>
        <td>
          <div dangerouslySetInnerHTML={{ __html: quiz.answer ?? '' }} />
        </td>
        <td>
          <Group spacing={3}>
            <Tooltip label={quiz.otherAnswer ? quiz.otherAnswer : '別解なし'}>
              <IconArrowsSplit size="1.5rem" stroke={1.4} color={quiz.otherAnswer ? colors.active(theme) : colors.disabled(theme)} />
            </Tooltip>
            <Tooltip label={quiz.explanation ? quiz.explanation : '解説なし'}>
              <IconNote size="1.5rem" stroke={1.4} color={quiz.explanation ? colors.active(theme) : colors.disabled(theme)} />
            </Tooltip>
            <Tooltip label={quiz.source ? quiz.source : '出典未記載'}>
              <IconBook2 size="1.5rem" stroke={1.4} color={quiz.source ? colors.active(theme) : colors.disabled(theme)} />
            </Tooltip>
          </Group>
        </td>
        <td>
          <Group spacing={3}>
            <ActionIcon
              size="lg"
              color="blue"
              onClick={() => {
                setEditingQuizId(
                  quiz.databaseId,
                  {
                    question: quiz.question ?? '',
                    answer: quiz.answer ?? '',
                  },
                );
              }}
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
        align="center"
        w="100%"
        style={{ tableLayout: 'fixed' }}
        verticalSpacing={0}
      >
        <thead>
          <tr>
            <th>問題文</th>
            <th style={{ width: '25%' }}>解答</th>
            <th style={{ width: 100 }}>追加情報</th>
            <th style={{ width: 100 }}>操作</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </Table>
    </Skeleton>
  );
};
