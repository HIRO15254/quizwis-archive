import { useForm } from '@mantine/form';
import { Link } from '@mantine/tiptap';
import Underline from '@tiptap/extension-underline';
import { Editor, EditorOptions, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useState } from 'react';

import { useCreateQuizMutation, useUpdateQuizMutation, useGetQuizLazyQuery } from 'gql';
import { Ruby } from 'util/tiptap/ruby';

interface UseInlineQuizEditorProps {
  reload: () => void;
  listId: string;
}

export const useInlineQuizEditor = (props: UseInlineQuizEditorProps) => {
  const { reload, listId } = props;

  const [editingQuizId, setEditingQuizId] = useState<string | null>(null);
  const [updateQuiz] = useUpdateQuizMutation();

  const form = useForm({
    initialValues: {
      question: '',
      answer: '',
      otherAnswer: '',
      explanation: '',
      source: '',
    },
  });

  const [createQuiz] = useCreateQuizMutation({
    variables: {
      input: {
        quizListDatabaseId: listId,
      },
    },
  });

  const [getQuiz] = useGetQuizLazyQuery({
    fetchPolicy: 'network-only',
  });

  const createNewQuiz = () => {
    createQuiz().then((created) => {
      setEditingQuizId(created.data?.createQuiz?.databaseId ?? null);
      reload();
    });
  };

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
  } as { [key: string]: Editor };

  const newSetEditingQuizId = (id: string | null) => {
    setEditingQuizId(id);
    getQuiz({
      variables: {
        input: {
          databaseId: id ?? '',
        },
      },
    }).then((res) => {
      const quiz = res.data?.getQuiz;
      questionEditor?.commands.setContent(quiz?.question ?? '', true);
      answerEditor?.commands.setContent(quiz?.answer ?? '', true);
      otherAnswerEditor?.commands.setContent(quiz?.otherAnswer ?? '', true);
      explanationEditor?.commands.setContent(quiz?.explanation ?? '', true);
      sourceEditor?.commands.setContent(quiz?.source ?? '', true);
    });
  };

  const onSubmit = () => {
    if (editingQuizId) {
      updateQuiz({
        variables: {
          input: {
            quizDatabaseId: editingQuizId,
            question: form.values.question !== '<p></p>' ? form.values.question : null,
            answer: form.values.answer !== '<p></p>' ? form.values.answer : null,
            otherAnswer: form.values.otherAnswer !== '<p></p>' ? form.values.otherAnswer : null,
            explanation: form.values.explanation !== '<p></p>' ? form.values.explanation : null,
            source: form.values.source !== '<p></p>' ? form.values.source : null,
          },
        },
      }).then(() => {
        newSetEditingQuizId(null);
        reload();
      });
    }
  };

  return {
    editors,
    editingQuizId,
    setEditingQuizId: newSetEditingQuizId,
    createQuiz: createNewQuiz,
    onSubmit,
  };
};
