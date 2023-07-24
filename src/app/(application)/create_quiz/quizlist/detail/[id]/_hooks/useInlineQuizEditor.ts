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
  reload: () => void;
  listId: string;
}

export const useInlineQuizEditor = (props: UseInlineQuizEditorProps) => {
  const { reload, listId } = props;

  const [editingQuizId, setEditingQuizId] = useState<string | null>(null);
  const [updateQuiz] = useUpdateQuizMutation();
  const [createQuiz] = useCreateQuizMutation();
  const [getQuiz] = useGetQuizLazyQuery({ fetchPolicy: 'cache-and-network' });

  const { data: genreData } = useGetGenresFromQuizListQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      input: {
        databaseId: listId,
      },
    },
  });

  const form = useForm({
    initialValues: {
      question: '',
      answer: '',
      otherAnswer: '',
      explanation: '',
      source: '',
      genre: '',
    },
  });

  const editorOptions = (path: string): Partial<EditorOptions> => ({
    extensions: [StarterKit, Ruby, Link, Underline],
    content: '',
    onUpdate({ editor: newEditor }) {
      form.setFieldValue(path, newEditor.getHTML());
    },
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
    let parentId = genre.parentGenre?.databaseId;
    while (parentId) {
      const oldParentId = parentId;
      const parent = genres?.find((g) => g.databaseId === oldParentId);
      val = `${parent?.name}${val ? '.' : ''}${val}`;
      parentId = parent?.parentGenre?.databaseId;
    }
    return ({
      value: genre.name,
      searchText: `${genre.name} ${val}`,
      label: genre.name,
      color: genre.color,
      group: val ?? '',
    });
  }) ?? [];
  const genreSelectorFormProps = form.getInputProps('genre');

  const questionEditor = useEditor(editorOptions('question'));
  const answerEditor = useEditor(editorOptions('answer'));
  const otherAnswerEditor = useEditor(editorOptions('otherAnswer'));
  const explanationEditor = useEditor(editorOptions('explanation'));
  const sourceEditor = useEditor(editorOptions('source'));

  const editors = {
    question: questionEditor,
    answer: answerEditor,
    otherAnswer: otherAnswerEditor,
    explanation: explanationEditor,
    source: sourceEditor,
  } as Editors;

  const newSetEditingQuizId = (id: string | null) => {
    getQuiz({
      variables: {
        input: {
          databaseId: id ?? '',
        },
      },
      onCompleted: (res) => {
        const quiz = res.getQuiz;
        questionEditor?.commands.setContent(quiz?.question ?? '', true);
        answerEditor?.commands.setContent(quiz?.answer ?? '', true);
        otherAnswerEditor?.commands.setContent(quiz?.otherAnswer ?? '', true);
        explanationEditor?.commands.setContent(quiz?.explanation ?? '', true);
        sourceEditor?.commands.setContent(quiz?.source ?? '', true);
        form.setFieldValue('genre', quiz?.genre?.name ?? '');
      },
    }).then(() => {
      setEditingQuizId(id);
    });
  };

  const createNewQuiz = () => {
    createQuiz({
      variables: {
        input: {
          quizListDatabaseId: listId,
        },
      },
      onCompleted: (res) => {
        newSetEditingQuizId(res.createQuiz.databaseId ?? null);
        reload();
      },
    });
  };

  const onSubmit = () => {
    newSetEditingQuizId(null);
    if (editingQuizId) {
      updateQuiz({
        variables: {
          input: {
            quizDatabaseId: editingQuizId,
            question: form.values.question,
            answer: form.values.answer,
            otherAnswer: form.values.otherAnswer,
            explanation: form.values.explanation,
            source: form.values.source,
            genreName: form.values.genre,
          },
        },
        onCompleted: () => {
          successNotification({ message: 'クイズを更新しました' });
          reload();
        },
        onError: () => {
          errorNotification({ message: 'クイズの更新に失敗しました' });
        },
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
