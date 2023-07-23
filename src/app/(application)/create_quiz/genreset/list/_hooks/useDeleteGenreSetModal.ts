import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';

import { useDeleteGenreSetMutation, useGetGenreSetLazyQuery } from 'gql';
import { errorNotification, successNotification } from 'util/notifications';

type UseDeleteGenreSetModalProps = {
  reload: () => void;
};

export const useDeleteGenreSetModal = (props: UseDeleteGenreSetModalProps) => {
  const { reload } = props;
  const [opened, handlers] = useDisclosure();
  const [deleteGenreSet] = useDeleteGenreSetMutation();
  const [getGenreSet] = useGetGenreSetLazyQuery();

  const [name, setName] = useState<string>('');
  const [databaseId, setDatabaseId] = useState<string>('');

  const open = async (open_id: string) => {
    setDatabaseId(open_id);
    handlers.open();
    getGenreSet({
      variables: {
        input: {
          databaseId: open_id,
        },
      },
      onCompleted: (res) => {
        setName(res.getGenreSet.name);
      },
    });
  };

  const onDelete = async () => {
    handlers.close();
    await deleteGenreSet({
      variables: {
        input: {
          databaseId,
        },
      },
      onCompleted: () => {
        successNotification({ message: 'ジャンルセットを削除しました' });
        reload();
      },
      onError: () => {
        errorNotification({ message: 'ジャンルセットの削除に失敗しました' });
      },
    });
  };

  const newHandlers = {
    ...handlers,
    open,
  };

  return {
    modalProps: {
      opened,
      close: handlers.close,
      onConfirm: onDelete,
      name,
    },
    handlers: newHandlers,
  };
};
