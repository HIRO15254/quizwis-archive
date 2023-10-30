import { useDisclosure } from '@mantine/hooks';
import React from 'react';

import { useCreateQuizMutation } from 'gql';
import { errorNotification, successNotification } from 'util/notifications';

import { useQuizForm } from './useQuizForm';
import { CreateQuizModal } from '../_components/CreateQuizModal';

interface Props {
  quizListId: string;
}

export const useCreateQuizModal = (props: Props) => {
  const { quizListId } = props;

  const [opened, handlers] = useDisclosure(false);
  const [
    createQuiz,
    { loading: mutationLoading },
  ] = useCreateQuizMutation();

  const {
    form,
    quizForm,
  } = useQuizForm();

  const open = () => {
    form.reset();
    handlers.open();
  };

  const onSubmit = form.onSubmit(async (values) => {
    await createQuiz({
      variables: {
        input: {
          quizListId,
          data: values,
        },
      },
      onCompleted: () => {
        successNotification({ message: '問題を作成しました' });
        handlers.close();
      },
      onError: () => {
        errorNotification({ message: '問題の作成に失敗しました' });
      },
      refetchQueries: ['GetQuizzes'],
    });
  });

  const modalProps = {
    opened,
    onClose: handlers.close,
    onSubmit,
    quizForm,
    buttonLoading: mutationLoading,
  };

  return {
    createQuizModal: <CreateQuizModal {...modalProps} />,
    createQuiz: open,
  };
};
