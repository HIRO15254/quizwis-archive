import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';

import { useDeleteQuizListMutation, useGetQuizListLazyQuery } from 'gql';
import { errorNotification, successNotification } from 'util/notifications';

type UseDeleteQuizListModalProps = {
  reload: () => void;
};

export const useDeleteQuizListModal = (props: UseDeleteQuizListModalProps) => {
  const { reload } = props;
  const [opened, handlers] = useDisclosure();
  const [deleteQuizList] = useDeleteQuizListMutation();
  const [getQuizList] = useGetQuizListLazyQuery({ fetchPolicy: 'cache-and-network' });

  const [name, setName] = useState<string>('');
  const [databaseId, setDatabaseId] = useState<string>('');

  const open = (open_id: string) => {
    handlers.open();
    setDatabaseId(open_id);
    getQuizList({
      variables: {
        input: {
          databaseId: open_id,
        },
      },
      onCompleted: (res) => {
        setName(res.getQuizList.name);
      },
    });
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
          databaseId,
        },
      },
      onCompleted: () => {
        successNotification({ message: 'クイズリストを削除しました' });
        reload();
      },
      onError: () => {
        errorNotification({ message: 'クイズリストの削除に失敗しました' });
      },
    });
  };

  return {
    modalProps: {
      opened,
      close: handlers.close,
      name,
      onConfirm: onDelete,
    },
    handlers: newHandlers,
  };
};
