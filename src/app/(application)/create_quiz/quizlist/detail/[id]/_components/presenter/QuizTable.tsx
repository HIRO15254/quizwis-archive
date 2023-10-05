/* eslint-disable react/no-danger */

'use client';

// 各種import
import {
  Button, Group, Skeleton, Stack, Table, Text,
} from '@mantine/core';
import {
  IconArrowsSplit, IconBook2, IconNote, IconPencil, IconPlus, IconTrash,
} from '@tabler/icons-react';
import React from 'react';

import { GenreBadge } from 'components/common/GenreBadge';
import { TableActionIcon } from 'components/common/TableActionICon';
import { QuizDataFragment } from 'gql';

import { AdditionalInfoIcon } from './AdditionalInfoIcon';
import { InlineQuizEditor, InlineQuizEditorProps } from './InlineQuizEditor';
// Propsの型定義

interface QuizTableProps {
  inlineQuizEditorProps: InlineQuizEditorProps;
  editingQuizId: string | null | undefined;
  operations: {
    create: () => void;
    delete: (databaseId: string) => void;
    update: (databaseId: string) => void;
  }
  loading: boolean;
  data: QuizDataFragment[];
  dataPerPageSelect: React.ReactNode;
  genreFilterSelect: React.ReactNode;
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
    dataPerPageSelect,
    genreFilterSelect,
  } = props;

  // 部分的なコンポーネントの宣言
  const rows = data.map((quiz) => {
    if (quiz.id === editingQuizId) {
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
          {quiz.length}
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
              onClick={() => operations.update(quiz.id)}
            />
            <TableActionIcon
              tooltip="削除"
              Icon={IconTrash}
              onClick={() => operations.delete(quiz.id)}
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
    <>
      <Group position="right">
        <Text>ジャンルフィルター</Text>
        {genreFilterSelect}
        <Text>表示件数</Text>
        {dataPerPageSelect}
        <Button
          onClick={() => operations.create()}
          leftIcon={<IconPlus />}
        >
          問題を追加
        </Button>
      </Group>
      <Skeleton visible={loading}>
        <Table
          mt="md"
          highlightOnHover
          fontSize="md"
          verticalSpacing={0}
        >
          <thead>
            <tr>
              <th>問題文</th>
              <th style={{ width: 0, whiteSpace: 'nowrap' }}>文字数</th>
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
      </Skeleton>
    </>
  );
};
