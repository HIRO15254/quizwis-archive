/* eslint-disable react/no-danger */

'use client';

// 各種import
import {
  ActionIcon,
  Button, Group, NativeSelect, Pagination, Skeleton, Stack, Table, Text, Tooltip,
} from '@mantine/core';
import {
  IconArrowsSplit, IconBook2, IconCheck, IconNote, IconPencil, IconPlus, IconTrash,
} from '@tabler/icons-react';
import { Editor } from '@tiptap/react';
import React from 'react';

import { GenreBadge } from 'components/common/GenreBadge';

import { AdditionalInfoEditIcon } from '../AdditionalInfoEditIcon';
import { AdditionalInfoIcon } from '../AdditionalInfoIcon';
import { ExplanationEditor } from '../Editors/ExplanationEditor';
import { GenreSelector, GenreSelectorProps } from '../Editors/GenreSelector';
import { InlineAnswerEditor } from '../Editors/InlineAnswerEditor';
import { InlineQuestionEditor } from '../Editors/InlineQuestionEditor';
import { OtherAnswerEditor } from '../Editors/OtherAnswerEditor';
import { SourceEditor } from '../Editors/SourceEditor';

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
  onSubmit: () => void;
  editors: { [key: string]: Editor };
  loading: boolean;
  data: QuizData[];
  editingQuizId: string | null | undefined;
  setEditingQuizId: (databaseId: string) => void;
  createNewQuiz: () => void;
  openDeleteQuizModal: (databaseId: string) => void;
  genreSelectorData: GenreSelectorProps['genres'];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  genreSelectorFormProps: { [key: string]: any };
  dataPerPage: number;
  setDataPerPage: (newDataPerPage: number) => void;
  totalPage: number;
  page: number;
  setNewPage: (newPage: number) => void;
}

/**
 * 説明
 */
export const QuizTable: React.FC<QuizTableProps> = (props) => {
  const {
    onSubmit,
    editors,
    data,
    loading,
    editingQuizId,
    setEditingQuizId,
    createNewQuiz,
    openDeleteQuizModal,
    genreSelectorData,
    genreSelectorFormProps,
    dataPerPage,
    setDataPerPage,
    totalPage,
    page,
    setNewPage,
  } = props;

  // 部分的なコンポーネントの宣言
  const rows = data.map((quiz) => {
    if (quiz.databaseId === editingQuizId) {
      return (
        <tr key={quiz.id}>
          <td>
            <InlineQuestionEditor editor={editors.question} />
          </td>
          <td>
            <InlineAnswerEditor editor={editors.answer} />
          </td>
          <td>
            <GenreSelector genres={genreSelectorData} {...genreSelectorFormProps} />
          </td>
          <td>
            <Group spacing={3}>
              <AdditionalInfoEditIcon
                label="別解"
                editor={editors.otherAnswer}
                Icon={IconArrowsSplit}
              >
                <OtherAnswerEditor editor={editors.otherAnswer} />
              </AdditionalInfoEditIcon>
              <AdditionalInfoEditIcon
                label="解説"
                editor={editors.explanation}
                Icon={IconNote}
              >
                <ExplanationEditor editor={editors.explanation} />
              </AdditionalInfoEditIcon>
              <AdditionalInfoEditIcon
                label="出典"
                editor={editors.source}
                Icon={IconBook2}
              >
                <SourceEditor editor={editors.source} />
              </AdditionalInfoEditIcon>
            </Group>
          </td>
          <td>
            <Group spacing={3}>
              <ActionIcon
                size="lg"
                color="green"
                onClick={onSubmit}
              >
                <Tooltip label="確定">
                  <IconCheck size="1.5rem" stroke={1.4} />
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
          <Group spacing={3}>
            <AdditionalInfoIcon tooltipLabel="別解" data={quiz.otherAnswer} Icon={IconArrowsSplit} />
            <AdditionalInfoIcon tooltipLabel="解説" data={quiz.explanation} Icon={IconNote} />
            <AdditionalInfoIcon tooltipLabel="出典" data={quiz.source} Icon={IconBook2} />
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
        <Text>表示件数</Text>
        <NativeSelect
          value={dataPerPage}
          onChange={(e) => setDataPerPage(Number(e.currentTarget.value))}
          style={{ width: 70 }}
          data={['10', '20', '50', '100']}
        />
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
            <th style={{ width: '15%' }}>解答</th>
            <th style={{ width: 200 }}>ジャンル</th>
            <th style={{ width: 100 }}>追加情報</th>
            <th style={{ width: 100 }}>操作</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </Table>
      <Group position="center" mt="md">
        <Pagination total={totalPage} value={page} onChange={setNewPage} withEdges />
      </Group>
    </Skeleton>
  );
};
