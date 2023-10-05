import { useForm } from '@mantine/form';
import { Link } from '@mantine/tiptap';
import Underline from '@tiptap/extension-underline';
import { EditorOptions, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useState } from 'react';

import {
  useCreateQuizMutation,
  useUpdateQuizMutation,
  useGetQuizLazyQuery,
  useGetGenresFromQuizListQuery,
} from 'gql';
import { errorNotification, successNotification } from 'util/notifications';
import { Ruby } from 'util/tiptap/ruby';

import { Editors } from '../_types/Editors';

interface UseInlineQuizEditorProps {
  listId: string;
}

export const useInlineQuizEditor = (props: UseInlineQuizEditorProps) => {
  const {
    listId,
  } = props;

  const [editingQuizId, setEditingQuizId] = useState<string | null>(null);
  const [updateQuiz] = useUpdateQuizMutation();
  const [createQuiz] = useCreateQuizMutation();
  const [getQuiz] = useGetQuizLazyQuery({ fetchPolicy: 'cache-and-network' });

  const { data: genreData } = useGetGenresFromQuizListQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      input: {
        id: listId,
      },
    },
  });

  const form = useForm({
    initialValues: {
      genre: '',
    },
  });

  const editorOptions = (): Partial<EditorOptions> => ({
    extensions: [StarterKit, Ruby, Link, Underline],
    content: '',
    editorProps: {
      attributes: {
        style: 'padding: 0.5rem',
      },
    },
  });

  const genres = genreData?.getQuizList?.genreSet?.genres;
  const genreSelectorData = genres?.filter(
    (genre) => genre.childGenres.length === 0,
  ).map((genre) => {
    let val = '';
    let parentId = genre.parentGenre?.id;
    while (parentId) {
      const oldParentId = parentId;
      const parent = genres?.find((g) => g.id === oldParentId);
      val = `${parent?.name}${val ? '.' : ''}${val}`;
      parentId = parent?.parentGenre?.id;
    }
    return ({
      value: genre.id,
      searchText: `${genre.name} ${val}`,
      label: genre.name,
      color: genre.color,
      group: val ?? '',
    });
  }) ?? [];
  const genreSelectorFormProps = form.getInputProps('genre');

  const questionEditor = useEditor(editorOptions());
  const answerEditor = useEditor(editorOptions());
  const otherAnswerEditor = useEditor(editorOptions());
  const explanationEditor = useEditor(editorOptions());
  const sourceEditor = useEditor(editorOptions());

  const editors = {
    question: questionEditor,
    answer: answerEditor,
    otherAnswer: otherAnswerEditor,
    explanation: explanationEditor,
    source: sourceEditor,
  } as Editors;

  const newSetEditingQuizId = (id: string | null) => {
    setEditingQuizId(id);
    if (id !== null) {
      getQuiz({
        variables: {
          input: {
            id,
          },
        },
        onCompleted: (res) => {
          const quiz = res.getQuiz;
          questionEditor?.commands.setContent(quiz?.question ?? '', true);
          answerEditor?.commands.setContent(quiz?.answer ?? '', true);
          otherAnswerEditor?.commands.setContent(quiz?.otherAnswer ?? '', true);
          explanationEditor?.commands.setContent(quiz?.explanation ?? '', true);
          sourceEditor?.commands.setContent(quiz?.source ?? '', true);
          form.setFieldValue('genre', quiz?.genre?.id ?? '');
        },
      });
    }
  };

  const createNewQuiz = async () => {
    await createQuiz({
      variables: {
        input: {
          quizListId: listId,
          data: {},
        },
      },
      refetchQueries: ['GetQuizzes', 'GetQuizCount'],
    });
  };

  const onSubmit = () => {
    newSetEditingQuizId(null);
    if (editingQuizId) {
      updateQuiz({
        variables: {
          input: {
            id: editingQuizId,
            data: {
              question: editors.question?.getHTML() ?? '',
              answer: editors.answer?.getHTML() ?? '',
              otherAnswer: editors.otherAnswer?.getHTML() ?? '',
              explanation: editors.explanation?.getHTML() ?? '',
              source: editors.source?.getHTML() ?? '',
              genreId: form.values.genre,
              length: questionEditor?.getText().length ?? 0,
            },
          },
        },
        onCompleted: () => {
          successNotification({ message: 'クイズを更新しました' });
        },
        onError: () => {
          errorNotification({ message: 'クイズの更新に失敗しました' });
        },
        refetchQueries: ['GetQuizzes', 'GetQuizCount'],
      });
    }
  };

  const onCancel = () => {
    setEditingQuizId(null);
  };

  return {
    inlineQuizEditorProps: {
      databaseId: editingQuizId,
      editors,
      operation: {
        update: onSubmit,
        cancel: onCancel,
      },
      genreSelectorData,
      genreSelectorFormProps,
    },
    update: newSetEditingQuizId,
    create: createNewQuiz,
    editingQuizId,
  };
};
