import { useForm } from '@mantine/form';
import { useState } from 'react';

import { useGetQuizLazyQuery } from 'gql';

export const useInlineQuizEditor = () => {
  const [editingQuizId, setEditingQuizId] = useState<string | null>(null);

  const form = useForm({
    initialValues: {
      question: '',
    },
  });

  const [reload, { data }] = useGetQuizLazyQuery({
    variables: {
      input: {
        databaseId: editingQuizId ?? '',
      },
    },
    onCompleted: (newData) => {
      form.setValues({
        question: newData.getQuiz?.question ?? '',
      });
    },
  });

  const newSetEditingQuizId = (id: string | null) => {
    setEditingQuizId(id);
    if (id) {
      reload();
    }
  };

  return {
    form,
    editingQuizId,
    setEditingQuizId: newSetEditingQuizId,
  };
};
