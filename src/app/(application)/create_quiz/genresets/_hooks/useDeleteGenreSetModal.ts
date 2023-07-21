import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';

import { useDeleteGenreSetMutation, useGetGenreSetLazyQuery } from 'gql';

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

  const onOpen = async (open_id: string) => {
    setDatabaseId(open_id);
    const genreSet = await getGenreSet({
      variables: {
        input: {
          databaseId: open_id,
        },
      },
    });
    setName(genreSet.data?.getGenreSet?.name ?? '');
    handlers.open();
  };

  const onDelete = async () => {
    await deleteGenreSet({
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
    open: onOpen,
    close: handlers.close,
  };

  return {
    opened, handlers: newHandlers, name, onDelete,
  };
};
