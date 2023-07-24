import { isNotEmpty, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';

import { useUpdateQuizListMutation, useGetQuizListLazyQuery } from 'gql';
import { errorNotification, successNotification } from 'util/notifications';

import { QuizListFormType } from '../_types/QuizListFormType';

type UseUpdateQuizListModalProps = {
  reload: () => void;
};

export const useUpdateQuizListModal = (props: UseUpdateQuizListModalProps) => {
  const { reload } = props;

  const [opened, handlers] = useDisclosure(false);
  const [updateQuizList] = useUpdateQuizListMutation();
  const [getQuizList] = useGetQuizListLazyQuery({ fetchPolicy: 'network-only' });
  const [databaseId, setDatabaseId] = useState<string>('');

  const form = useForm<QuizListFormType>({
    initialValues: {
      name: '',
      description: '',
      genreSetId: '',
      useGoal: false,
      goal: 100,
    },
    validate: {
      name: isNotEmpty('このフィールドは必須です'),
    },
  });

  const open = (open_id: string) => {
    setDatabaseId(open_id);
    getQuizList({
      variables: {
        input: {
          databaseId: open_id,
        },
      },
      onCompleted: (res) => {
        form.setValues({
          name: res.getQuizList.name,
          description: res.getQuizList.description,
          genreSetId: res.getQuizList.genreSet?.databaseId,
          useGoal: res.getQuizList.goal > 0,
          goal: res.getQuizList.goal,
        });
      },
    }).then(() => {
      handlers.open();
    });
  };

  const newHandlers = {
    ...handlers,
    open,
  };

  const onSubmit = form.onSubmit((values) => {
    newHandlers.close();
    updateQuizList({
      variables: {
        input: {
          databaseId,
          name: values.name,
          description: values.description,
          genreSetId: values.genreSetId ?? undefined,
          goal: values.useGoal ? values.goal : 0,
        },
      },
      onCompleted: () => {
        successNotification({ message: 'クイズリストを更新しました' });
        reload();
      },
      onError: () => {
        errorNotification({ message: 'クイズリストの更新に失敗しました' });
      },
    });
  });

  return {
    modalProps: {
      opened,
      close: newHandlers.close,
      onSubmit,
      form,
    },
    handlers: newHandlers,
  };
};
