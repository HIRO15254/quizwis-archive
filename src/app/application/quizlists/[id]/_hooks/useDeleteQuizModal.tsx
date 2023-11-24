import { useDisclosure } from '@mantine/hooks';
import React, { useState } from 'react';

import { useDeleteQuizMutation, useGetQuizLazyQuery } from 'gql';
import { errorNotification, successNotification } from 'util/notifications';

import { DeleteQuizModal } from '../_components/DeleteQuizModal';

export const useDeleteQuizModal = () => {
  const [opened, handlers] = useDisclosure();
  const [
    deleteQuiz,
    { loading: mutationLoading },
  ] = useDeleteQuizMutation();

  const [
    getQuiz,
    {
      data: quizData,
      loading: getQuizLoading,
    },
  ] = useGetQuizLazyQuery();

  const [id, setId] = useState<string>('');

  const open = async (openId: string) => {
    setId(openId);
    getQuiz({ variables: { input: { id: openId } } });
    handlers.open();
  };

  const onDelete = async () => {
    await deleteQuiz({
      variables: {
        input: {
          id,
        },
      },
      onCompleted: () => {
        successNotification({ message: 'クイズを削除しました。' });
        handlers.close();
      },
      onError: () => {
        errorNotification({ message: 'クイズの削除に失敗しました。' });
      },
      refetchQueries: ['GetQuizzes'],
    });
  };

  const modalProps = {
    data: quizData?.getQuiz,
    opened,
    onClose: handlers.close,
    onConfirm: onDelete,
    loading: getQuizLoading,
    buttonLoading: mutationLoading,
  };

  return {
    deleteQuizModal: <DeleteQuizModal {...modalProps} />,
    deleteQuiz: open,
  };
};
