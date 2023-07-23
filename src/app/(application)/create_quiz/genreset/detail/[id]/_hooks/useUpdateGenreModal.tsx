import { isNotEmpty, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { useState } from 'react';

import { useUpdateGenreMutation, useGetGenreLazyQuery } from 'gql';

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
    getGenre({
      fetchPolicy: 'cache-and-network',
      variables: { input: { databaseId: openDatabaseId } },
      onCompleted: (res) => {
        form.setValues(res.getGenre);
      },
    });
    handlers.open();
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
    }).then(() => {
      showNotification({
        title: '更新成功',
        message: 'ジャンルを更新しました',
        color: 'blue',
      });
      reload();
    });
  });

  const newHandlers = {
    open,
    close: handlers.close,
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
