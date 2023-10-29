import { useDisclosure } from '@mantine/hooks';
import React, { useState } from 'react';

import { useUpdateGenreMutation, useGetGenreLazyQuery } from 'gql';
import { errorNotification, successNotification } from 'util/notifications';

import { useGenreForm } from './useGenreForm';
import { UpdateGenreModal } from '../_components/UpdateGenreModal';

export const useUpdateGenreModal = () => {
  const [opened, handlers] = useDisclosure();
  const [updateGenre, { loading: mutationLoading }] = useUpdateGenreMutation();
  const [getGenre, { loading }] = useGetGenreLazyQuery();
  const [id, setId] = useState<string>('');

  const {
    form,
    genreForm,
  } = useGenreForm();

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
          data: values,
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
    genreForm,
    loading,
    buttonLoading: mutationLoading,
  };

  return {
    updateGenreModal: <UpdateGenreModal {...modalProps} />,
    updateGenre: open,
  };
};
