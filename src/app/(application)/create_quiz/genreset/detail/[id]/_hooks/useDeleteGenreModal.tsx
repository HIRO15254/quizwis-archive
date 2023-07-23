import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';

import { useDeleteGenreMutation, useGetGenreLazyQuery } from 'gql';
import { errorNotification, successNotification } from 'util/notifications';

type UseDeleteGenreModalProps = {
  reload: () => void;
};

export const useDeleteGenreModal = (props: UseDeleteGenreModalProps) => {
  const { reload } = props;
  const [opened, handlers] = useDisclosure();
  const [deleteGenre] = useDeleteGenreMutation();
  const [getGenre] = useGetGenreLazyQuery();

  const [name, setName] = useState<string>('');
  const [databaseId, setDatabaseId] = useState<string>('');

  const open = async (open_id: string) => {
    setDatabaseId(open_id);
    const genre = await getGenre({
      variables: {
        input: {
          databaseId: open_id,
        },
      },
    });
    setName(genre.data?.getGenre?.name ?? '');
    handlers.open();
  };

  const onDelete = async () => {
    handlers.close();
    await deleteGenre({
      variables: {
        input: {
          databaseId,
        },
      },
      onCompleted: () => {
        successNotification({ message: 'ジャンルを削除しました' });
        reload();
      },
      onError: () => {
        errorNotification({ message: 'ジャンルの削除に失敗しました' });
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
    name,
    handlers: newHandlers,
  };
};
