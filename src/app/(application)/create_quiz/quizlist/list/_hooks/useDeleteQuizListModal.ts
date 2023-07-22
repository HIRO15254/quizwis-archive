import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';

import { useDeleteQuizListMutation, useGetQuizListLazyQuery } from 'gql';

type UseDeleteQuizListModalProps = {
  reload: () => void;
};

export const useDeleteQuizListModal = (props: UseDeleteQuizListModalProps) => {
  const { reload } = props;
  const [opened, handlers] = useDisclosure();
  const [deleteQuizList] = useDeleteQuizListMutation();
  const [getQuizList] = useGetQuizListLazyQuery();

  const [name, setName] = useState<string>('');
  const [databaseId, setDatabaseId] = useState<string>('');

  const onOpen = async (open_id: string) => {
    setDatabaseId(open_id);
    const quizList = await getQuizList({
      variables: {
        input: {
          databaseId: open_id,
        },
      },
    });
    setName(quizList.data?.getQuizList?.name ?? '');
    handlers.open();
  };

  const onDelete = async () => {
    await deleteQuizList({
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
