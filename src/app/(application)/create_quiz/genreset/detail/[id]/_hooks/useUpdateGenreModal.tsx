import { isNotEmpty, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';

import { useUpdateGenreMutation, useGetGenreLazyQuery } from 'gql';
import { errorNotification, successNotification } from 'util/notifications';

import type { GenreFormType } from '../_types/GenreFormType';

type UseUpdateGenreModalProps = {
  reload: () => void;
};

export const useUpdateGenreModal = (props: UseUpdateGenreModalProps) => {
  const { reload } = props;
  const [opened, handlers] = useDisclosure();
  const [updateGenre] = useUpdateGenreMutation();
  const [getGenre, { loading }] = useGetGenreLazyQuery();
  const [databaseId, setDatabaseId] = useState<string>('');

  const form = useForm<GenreFormType>({
    initialValues: {
      name: '',
      description: '',
      ratio: 1,
      color: 'gray',
    },
    validate: {
      name: isNotEmpty('このフィールドは必須です'),
    },
  });

  const open = async (openDatabaseId: string) => {
    setDatabaseId(openDatabaseId);
    handlers.open();
    getGenre({
      fetchPolicy: 'cache-and-network',
      variables: { input: { databaseId: openDatabaseId } },
      onCompleted: (res) => {
        form.setValues({
          name: res.getGenre.name,
          description: res.getGenre.description,
          ratio: res.getGenre.ratio,
          color: res.getGenre.color,
        });
      },
    });
  };

  const onSubmit = form.onSubmit(async (values) => {
    handlers.close();
    form.reset();
    updateGenre({
      variables: {
        input: {
          databaseId,
          ...values,
        },
      },
      onCompleted: () => {
        successNotification({ message: '更新しました' });
        reload();
      },
      onError: () => {
        errorNotification({ message: '更新に失敗しました' });
      },
    });
  });

  const newHandlers = {
    ...handlers,
    open,
  };

  return {
    genreFormModalProps: {
      opened,
      close: handlers.close,
      onSubmit,
      form,
      loading,
    },
    handlers: newHandlers,
  };
};
