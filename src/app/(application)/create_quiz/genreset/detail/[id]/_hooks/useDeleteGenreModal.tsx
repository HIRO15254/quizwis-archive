import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';

import { useDeleteGenreMutation, useGetGenreLazyQuery } from 'gql';

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
    await deleteGenre({
      variables: {
        input: {
          databaseId,
        },
      },
    });
    reload();
    handlers.close();
  };

  const newHandlers = {
    open,
    close: handlers.close,
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
