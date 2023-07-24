/* eslint-disable react/no-danger */

'use client';

// 各種import
import {
  Button, Group, NativeSelect, Pagination, PaginationProps, Skeleton, Stack, Table, Text,
} from '@mantine/core';
import {
  IconArrowsSplit, IconBook2, IconNote, IconPencil, IconPlus, IconTrash,
} from '@tabler/icons-react';
import React from 'react';

import { GenreBadge } from 'components/common/GenreBadge';
import { TableActionIcon } from 'components/common/TableActionICon';

import { AdditionalInfoIcon } from '../AdditionalInfoIcon';
import { InlineQuizEditor, InlineQuizEditorProps } from '../InlineQuizEditor';

// Propsの型定義
interface QuizData {
  id: string;
  databaseId: string;
  question?: string | null | undefined;
  answer?: string | null | undefined;
  otherAnswer?: string | null | undefined;
  explanation?: string | null | undefined;
  source?: string | null | undefined;
  genre?: {
    databaseId: string;
    name: string;
    color?: string | null | undefined;
  } | null | undefined;
}

interface QuizTableProps {
  inlineQuizEditorProps: InlineQuizEditorProps;
  editingQuizId: string | null | undefined;
  operations: {
    create: () => void;
    delete: (databaseId: string) => void;
    update: (databaseId: string) => void;
  }
  loading: boolean;
  data: QuizData[];
  dataPerPage: number;
  setDataPerPage: (newDataPerPage: number) => void;
  paginationProps: PaginationProps;
}

/**
 * 説明
 */
export const QuizTable: React.FC<QuizTableProps> = (props) => {
  const {
    inlineQuizEditorProps,
    editingQuizId,
    operations,
    data,
    loading,
    dataPerPage,
    setDataPerPage,
    paginationProps,
  } = props;

  // 部分的なコンポーネントの宣言
  const rows = data.map((quiz) => {
    if (quiz.databaseId === editingQuizId) {
      return (
        <tr key={quiz.id}>
          <InlineQuizEditor {...inlineQuizEditorProps} />
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
          {quiz.genre && (
            <GenreBadge color={quiz.genre.color ?? 'gray'}>
              {quiz.genre.name}
            </GenreBadge>
          )}
          {!quiz.genre && (
            <Text c="dimmed">未設定</Text>
          )}
        </td>
        <td>
          <Group spacing={3} noWrap>
            <AdditionalInfoIcon tooltipLabel="別解" data={quiz.otherAnswer} Icon={IconArrowsSplit} />
            <AdditionalInfoIcon tooltipLabel="解説" data={quiz.explanation} Icon={IconNote} />
            <AdditionalInfoIcon tooltipLabel="出典" data={quiz.source} Icon={IconBook2} />
          </Group>
        </td>
        <td>
          <Group spacing={3} noWrap>
            <TableActionIcon
              tooltip="編集"
              Icon={IconPencil}
              onClick={() => operations.update(quiz.databaseId)}
            />
            <TableActionIcon
              tooltip="削除"
              Icon={IconTrash}
              onClick={() => operations.delete(quiz.databaseId)}
              color="red"
            />
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
          onClick={() => operations.create()}
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
        <Text>表示件数</Text>
        <NativeSelect
          value={dataPerPage}
          onChange={(e) => setDataPerPage(Number(e.currentTarget.value))}
          style={{ width: 70 }}
          data={['10', '20', '50', '100']}
        />
        <Button
          onClick={() => operations.create()}
          leftIcon={<IconPlus />}
        >
          問題を追加
        </Button>
      </Group>
      <Table
        mt="md"
        highlightOnHover
        fontSize="md"
        verticalSpacing={0}
      >
        <thead>
          <tr>
            <th>問題文</th>
            <th style={{ width: '15%' }}>解答</th>
            <th style={{ width: '13rem' }}>ジャンル</th>
            <th style={{ width: 0 }}>追加情報</th>
            <th style={{ width: 0 }}>操作</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </Table>
      <Group position="center" mt="md">
        <Pagination {...paginationProps} withEdges />
      </Group>
    </Skeleton>
  );
};
