import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';

import { useDeleteQuizMutation } from 'gql';

type UseDeleteQuizModalProps = {
  reload: () => void;
};

export const useDeleteQuizModal = (props: UseDeleteQuizModalProps) => {
  const { reload } = props;
  const [opened, handlers] = useDisclosure();
  const [deleteQuizList] = useDeleteQuizMutation();

  const [databaseId, setDatabaseId] = useState<string>('');

  const onOpen = async (open_id: string) => {
    setDatabaseId(open_id);
    handlers.open();
  };

  const onDelete = async () => {
    await deleteQuizList({
      variables: {
        input: {
          quizDatabaseId: databaseId,
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
    opened, handlers: newHandlers, onDelete,
  };
};
