import { useDisclosure } from '@mantine/hooks';
import React, { useState } from 'react';

import { useDeleteQuizMutation } from 'gql';
import { errorNotification, successNotification } from 'util/notifications';

import { DeleteQuizModal } from '../_components/presenter/DeleteQuizModal';

export const useDeleteQuizModal = () => {
  const [opened, handlers] = useDisclosure();
  const [
    deleteQuizList,
    { loading: mutationLoading },
  ] = useDeleteQuizMutation();

  const [id, setId] = useState<string>('');

  const open = async (openId: string) => {
    setId(openId);
    handlers.open();
  };

  const onDelete = async () => {
    await deleteQuizList({
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
      refetchQueries: ['GetQuizzes', 'GetQuizCount'],
    });
  };

  const modalProps = {
    opened,
    onClose: handlers.close,
    onConfirm: onDelete,
    buttonLoading: mutationLoading,
  };

  return {
    deleteQuizModal: <DeleteQuizModal {...modalProps} />,
    deleteQuiz: open,
  };
};
