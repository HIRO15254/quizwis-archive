import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';

import { useDeleteQuizMutation } from 'gql';
import { errorNotification, successNotification } from 'util/notifications';

type UseDeleteQuizModalProps = {
  reload: () => void;
};

export const useDeleteQuizModal = (props: UseDeleteQuizModalProps) => {
  const { reload } = props;
  const [opened, handlers] = useDisclosure();
  const [deleteQuizList] = useDeleteQuizMutation();

  const [databaseId, setDatabaseId] = useState<string>('');

  const open = async (open_id: string) => {
    setDatabaseId(open_id);
    handlers.open();
  };

  const newHandlers = {
    ...handlers,
    open,
  };

  const onDelete = () => {
    handlers.close();
    deleteQuizList({
      variables: {
        input: {
          quizDatabaseId: databaseId,
        },
      },
      onCompleted: () => {
        successNotification({ message: 'クイズを削除しました。' });
        reload();
      },
      onError: () => {
        errorNotification({ message: 'クイズの削除に失敗しました。' });
      },
    });
  };

  return {
    modalProps: {
      opened,
      close: handlers.close,
      onConfirm: onDelete,
    },
    handlers: newHandlers,
  };
};
