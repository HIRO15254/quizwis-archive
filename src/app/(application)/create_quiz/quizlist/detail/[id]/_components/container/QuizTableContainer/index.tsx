'use client';

// 各種import
import {
  Title, Paper, Group, Anchor, ActionIcon, Tooltip,
} from '@mantine/core';
import { useHotkeys } from '@mantine/hooks';
import { IconChartBar } from '@tabler/icons-react';
import React, { useCallback, useEffect } from 'react';

import {
  useGetGenresFromQuizListQuery,
  useGetQuizCountLazyQuery,
  useGetQuizListQuery,
  useGetQuizzesLazyQuery,
} from 'gql';

import { useDeleteQuizModal } from '../../../_hooks/useDeleteQuizModal';
import { useInlineQuizEditor } from '../../../_hooks/useInlineQuizEditor';
import { usePageNation } from '../../../_hooks/usePageNation';
import { useQuizListStatModal } from '../../../_hooks/useQuizListStatModal';
import { DeleteQuizModal } from '../../presenter/DeleteQuizModal';
import { QuizListStatModal } from '../../presenter/QuizListStatModal';
import { QuizTable } from '../../presenter/QuizTable';

interface QuizTableContainerProps {
  listId: string;
}

/**
 * クイズリストの一覧表示
 */
export const QuizTableContainer: React.FC<QuizTableContainerProps> = (props) => {
  const { listId } = props;
  const [genreFilter, setGenreFilter] = React.useState<string | undefined>(undefined);

  const [reloadQuizzes, { loading, data, called }] = useGetQuizzesLazyQuery({
    fetchPolicy: 'network-only',
  });

  const { data: quizListName } = useGetQuizListQuery({
    variables: {
      input: {
        databaseId: listId,
      },
    },
  });

  const {
    paginationProps, dataPerPage, setDataPerPage, page, setDataCount, setPage,
  } = usePageNation({
    onChangePage: (newPage: number, newDataPerPage?: number) => {
      reloadQuizzes({
        variables: {
          input: {
            quizListDatabaseId: listId,
            take: newDataPerPage ?? dataPerPage,
            page: newPage,
          },
        },
      });
    },
  });

  const [reloadQuizCount] = useGetQuizCountLazyQuery({
    fetchPolicy: 'network-only',
    variables: {
      input: {
        databaseId: listId,
      },
    },
    onCompleted: (dat) => { setDataCount(dat.getQuizList.quizCount); },
  });

  const reload = useCallback(() => {
    reloadQuizzes({
      variables: {
        input: {
          quizListDatabaseId: listId,
          genreId: genreFilter,
          take: dataPerPage,
          page,
        },
      },
    });
    reloadQuizCount();
  }, [dataPerPage, listId, page, reloadQuizCount, reloadQuizzes, genreFilter]);

  const { data: quizGenres } = useGetGenresFromQuizListQuery({
    variables: {
      input: {
        databaseId: listId,
      },
    },
  });
  const genres = quizGenres?.getQuizList.genreSet?.genres.map((genre) => ({
    value: genre.databaseId,
    label: genre.name,
  }));
  const changeGenre = (id?: string) => {
    setGenreFilter(id);
    // TODO: 辞める
    if (genreFilter) {
      setPage(1);
    }
    reload();
  };

  const {
    modalProps: statModalProps,
    handlers: statModalHandlers,
  } = useQuizListStatModal({ listId });

  useEffect(() => {
    reload();
  }, [reload]);

  const {
    inlineQuizEditorProps,
    create,
    update,
    editingQuizId,
  } = useInlineQuizEditor({ reload, listId });

  const {
    modalProps: deleteQuizModalProps,
    handlers: deleteQuizModalHandlers,
  } = useDeleteQuizModal({ reload });

  useHotkeys([
    ['mod+alt+N', () => create(), { preventDefault: true }],
    ['mod+I', () => { statModalHandlers.open(); }, { preventDefault: true }],
    ['mod+Enter', () => { if (editingQuizId) { inlineQuizEditorProps.operation.update(); } }, { preventDefault: true }],
    ['Escape', () => { if (editingQuizId) { inlineQuizEditorProps.operation.cancel(); } }, { preventDefault: true }],
  ]);

  // 実際のコンポーネント
  return (
    <Group position="center" pb="sm">
      <Paper w="100%" maw={1200} p="xl" shadow="xs">
        <Anchor href="/create_quiz/quizlist/list" unstyled>
          {'< 問題リスト一覧に戻る'}
        </Anchor>
        <Group align="baseline">
          <Title order={1} mt="md">
            {quizListName?.getQuizList.name ?? ''}
          </Title>
          {(data || !loading) && called && (
            <Tooltip label="集計(ctrl + I)">
              <ActionIcon size="lg" variant="subtle" color="blue" onClick={statModalHandlers.open}>
                <IconChartBar />
              </ActionIcon>
            </Tooltip>
          )}
        </Group>
        <QuizListStatModal {...statModalProps} />
        <DeleteQuizModal {...deleteQuizModalProps} title="問題削除" confirmText="削除" confirmColor="red" />
        <QuizTable
          genres={genres ?? []}
          changeGenre={changeGenre}
          inlineQuizEditorProps={inlineQuizEditorProps}
          operations={{
            create,
            update,
            delete: deleteQuizModalHandlers.open,
          }}
          editingQuizId={editingQuizId}
          data={data?.getQuizzes ?? []}
          loading={(!data && loading) || !called}
          dataPerPage={dataPerPage}
          setDataPerPage={setDataPerPage}
          paginationProps={paginationProps}
        />
      </Paper>
    </Group>
  );
};
