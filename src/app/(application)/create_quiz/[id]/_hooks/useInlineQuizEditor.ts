import { useForm } from '@mantine/form';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useState } from 'react';

import { useUpdateQuizMutation } from 'gql';
import { Ruby } from 'util/tiptap/ruby';

interface UseInlineQuizEditorProps {
  reload: () => void;
}

export const useInlineQuizEditor = (props: UseInlineQuizEditorProps) => {
  const { reload } = props;

  const [editingQuizId, setEditingQuizId] = useState<string | null>(null);
  const [updateQuiz] = useUpdateQuizMutation();

  const form = useForm({
    initialValues: {
      question: '',
      answer: '',
    },
  });

  const questionEditor = useEditor({
    extensions: [
      StarterKit,
      Ruby,
    ],
    content: '',
    onUpdate({ editor: newEditor }) {
      form.setFieldValue('question', newEditor.getHTML());
    },
    editorProps: {
      attributes: {
        style: 'padding: 0.5rem',
      },
    },
  });

  const answerEditor = useEditor({
    extensions: [
      StarterKit,
      Ruby,
    ],
    content: '',
    onUpdate({ editor: newEditor }) {
      form.setFieldValue('answer', newEditor.getHTML());
    },
    editorProps: {
      attributes: {
        style: 'padding: 0.5rem',
      },
    },
  });

  const newSetEditingQuizId = (id: string | null, quiz?: { question: string, answer: string }) => {
    setEditingQuizId(id);
    if (!questionEditor || !answerEditor) {
      return;
    }
    questionEditor.commands.setContent(quiz?.question ?? '', true);
    answerEditor.commands.setContent(quiz?.answer ?? '', true);
  };

  const onSubmit = () => {
    if (editingQuizId) {
      updateQuiz({
        variables: {
          input: {
            quizDatabaseId: editingQuizId,
            question: form.values.question,
            answer: form.values.answer,
          },
        },
      }).then(() => {
        newSetEditingQuizId(null);
        reload();
      });
    }
  };

  return {
    onSubmit,
    questionEditor,
    answerEditor,
    editingQuizId,
    setEditingQuizId: newSetEditingQuizId,
  };
};
