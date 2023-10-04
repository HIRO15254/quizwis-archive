import { isNotEmpty, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import React, { useState } from 'react';

import { useUpdateGenreMutation, useGetGenreLazyQuery } from 'gql';
import { errorNotification, successNotification } from 'util/notifications';

import { UpdateGenreModal } from '../_components/presenter/UpdateGenreModal';

import type { GenreFormType } from '../_types/GenreFormType';

export const useUpdateGenreModal = () => {
  const [opened, handlers] = useDisclosure();
  const [updateGenre, { loading: mutationLoading }] = useUpdateGenreMutation();
  const [getGenre, { loading }] = useGetGenreLazyQuery({ fetchPolicy: 'cache-and-network' });
  const [id, setId] = useState<string>('');

  const form = useForm<GenreFormType>({
    initialValues: {
      name: '',
      description: '',
      ratio: 5,
      color: 'gray',
    },
    validate: {
      name: isNotEmpty('このフィールドは必須です'),
    },
  });

  const open = async (openId: string) => {
    handlers.open();
    form.reset();
    setId(openId);
    await getGenre({
      variables: {
        input: {
          id: openId,
        },
      },
      onCompleted: (res) => {
        form.setValues({
          name: res.getGenre.name,
          description: res.getGenre.description ?? '',
          ratio: res.getGenre.ratio,
          color: res.getGenre.color ?? 'gray',
        });
      },
    });
  };

  const onSubmit = form.onSubmit(async (values) => {
    await updateGenre({
      variables: {
        input: {
          id,
          ...values,
        },
      },
      onCompleted: () => {
        successNotification({ message: '更新しました' });
        handlers.close();
      },
      onError: () => {
        errorNotification({ message: '更新に失敗しました' });
      },
      refetchQueries: ['GetGenreDetailPageData'],
    });
  });

  const modalProps = {
    opened,
    onClose: handlers.close,
    onSubmit,
    form,
    loading,
    buttonLoading: mutationLoading,
  };

  return {
    updateGenreModal: <UpdateGenreModal {...modalProps} />,
    updateGenre: open,
  };
};
