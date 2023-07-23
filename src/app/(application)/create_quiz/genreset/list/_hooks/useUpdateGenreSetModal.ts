import { isNotEmpty, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';

import { useUpdateGenreSetMutation, useGetGenreSetLazyQuery } from 'gql';
import { errorNotification, successNotification } from 'util/notifications';

import type { GenreSetFormType } from '../_types/GenreSetFormType';

type UseUpdateGenreSetModalProps = {
  reload: () => void;
};

export const useUpdateGenreSetModal = (props: UseUpdateGenreSetModalProps) => {
  const { reload } = props;
  const [opened, handlers] = useDisclosure();
  const [updateGenreSet] = useUpdateGenreSetMutation();
  const [getGenreSet, { loading }] = useGetGenreSetLazyQuery({ fetchPolicy: 'cache-and-network' });
  const [databaseId, setDatabaseId] = useState<string>('');

  const form = useForm<GenreSetFormType>({
    initialValues: {
      name: '',
      description: '',
    },
    validate: {
      name: isNotEmpty('このフィールドは必須です'),
    },
  });

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
        form.setValues({
          name: res.getGenreSet.name,
          description: res.getGenreSet.description,
        });
      },
    });
  };

  const onSubmit = form.onSubmit((values) => {
    handlers.close();
    updateGenreSet({
      variables: {
        input: {
          databaseId,
          name: values.name,
          description: values.description,
        },
      },
      onCompleted: () => {
        successNotification({ message: 'ジャンルセットを更新しました' });
        reload();
      },
      onError: () => {
        errorNotification({ message: 'ジャンルセットの更新に失敗しました' });
      },
    });
  });

  const newHandlers = {
    ...handlers,
    open,
  };

  return {
    modalProps: {
      opened,
      close: handlers.close,
      onSubmit,
      form,
      loading,
    },
    handlers: newHandlers,
  };
};
