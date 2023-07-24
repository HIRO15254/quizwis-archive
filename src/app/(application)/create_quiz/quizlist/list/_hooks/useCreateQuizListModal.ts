import { isNotEmpty, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useCallback } from 'react';

import { useCreateQuizListMutation } from 'gql';
import { errorNotification, successNotification } from 'util/notifications';

import type { QuizListFormType } from '../_types/QuizListFormType';

type UseCreateQuizListModalProps = {
  reload: () => void;
};

export const useCreateQuizListModal = (props: UseCreateQuizListModalProps) => {
  const { reload } = props;

  const [opened, handlers] = useDisclosure(false);
  const [createQuizList] = useCreateQuizListMutation();

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

  const newHandlers = {
    ...handlers,
    open: useCallback(() => {
      handlers.open();
    }, [handlers]),
    close: useCallback(() => {
      form.reset();
      handlers.close();
    }, [form, handlers]),
  };

  const onSubmit = form.onSubmit((values) => {
    newHandlers.close();
    createQuizList({
      variables: {
        input: {
          name: values.name,
          description: values.description,
          genreSetId: values.genreSetId,
          goal: values.useGoal ? values.goal : 0,
        },
      },
      onCompleted: () => {
        successNotification({ message: 'クイズリストを作成しました' });
        reload();
      },
      onError: () => {
        errorNotification({ message: 'クイズリストの作成に失敗しました' });
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
