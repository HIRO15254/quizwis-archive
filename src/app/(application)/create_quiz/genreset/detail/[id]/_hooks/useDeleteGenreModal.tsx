import { useDisclosure } from '@mantine/hooks';
import React, { useState } from 'react';

import { useDeleteGenreMutation, useGetGenreLazyQuery } from 'gql';
import { errorNotification, successNotification } from 'util/notifications';

import { DeleteGenreModal } from '../_components/presenter/DeleteGenreModal';

export const useDeleteGenreModal = () => {
  const [opened, handlers] = useDisclosure();
  const [
    deleteGenre,
    { loading: mutationLoading },
  ] = useDeleteGenreMutation();
  const [
    getGenre,
    { data: genreData, loading },
  ] = useGetGenreLazyQuery();
  const [id, setId] = useState<string>('');

  const open = async (openId: string) => {
    handlers.open();
    setId(openId);
    await getGenre({
      variables: {
        input: {
          id: openId,
        },
      },
    });
  };

  const onDelete = async () => {
    handlers.close();
    await deleteGenre({
      variables: {
        input: {
          id,
        },
      },
      onCompleted: () => {
        successNotification({ message: 'ジャンルを削除しました' });
      },
      onError: () => {
        errorNotification({ message: 'ジャンルの削除に失敗しました' });
      },
      refetchQueries: ['GetGenreDetailPageData'],
    });
  };

  const modalProps = {
    opened,
    onClose: handlers.close,
    onConfirm: onDelete,
    data: genreData?.getGenre,
    loading,
    buttonLoading: mutationLoading,
  };

  return {
    deleteGenreModal: <DeleteGenreModal {...modalProps} />,
    deleteGenre: open,
  };
};
