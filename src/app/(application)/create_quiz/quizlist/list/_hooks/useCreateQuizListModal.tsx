import { useDisclosure } from '@mantine/hooks';
import React from 'react';

import { useCreateQuizListMutation } from 'gql';
import { errorNotification, successNotification } from 'util/notifications';

import { useQuizListForm } from './useQuizListForm';
import { CreateQuizListModal } from '../_components/presenter/CreateQuizListModal';

export const useCreateQuizListModal = () => {
  const [opened, handlers] = useDisclosure(false);
  const [
    createQuizList,
    { loading: mutationLoading },
  ] = useCreateQuizListMutation();

  const {
    form,
    loading,
    quizListForm,
    toQuizListInput,
  } = useQuizListForm();

  const open = () => {
    form.reset();
    handlers.open();
  };

  const onSubmit = form.onSubmit(async (values) => {
    await createQuizList({
      variables: {
        input: {
          data: toQuizListInput(values),
        },
      },
      onCompleted: () => {
        successNotification({ message: '問題リストを作成しました' });
        handlers.close();
      },
      onError: () => {
        errorNotification({ message: '問題リストの作成に失敗しました' });
      },
      refetchQueries: ['GetQuizLists'],
    });
  });

  const modalProps = {
    opened,
    onClose: handlers.close,
    onSubmit,
    quizListForm,
    loading,
    buttonLoading: mutationLoading,
  };

  return {
    createQuizListModal: <CreateQuizListModal {...modalProps} />,
    createQuizList: open,
  };
};
