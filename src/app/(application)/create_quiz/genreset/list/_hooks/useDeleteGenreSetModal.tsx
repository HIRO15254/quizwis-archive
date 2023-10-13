import { useDisclosure } from '@mantine/hooks';
import React, { useState } from 'react';

import { useDeleteGenreSetMutation, useGetGenreSetLazyQuery } from 'gql';
import { errorNotification, successNotification } from 'util/notifications';

import { DeleteGenreSetModal } from '../_components/DeleteGenreSetModal';

export const useDeleteGenreSetModal = () => {
  const [opened, handlers] = useDisclosure();
  const [
    deleteGenreSetMutation,
    { loading: mutationLoading },
  ] = useDeleteGenreSetMutation();
  const [
    getGenreSet,
    {
      data: genreSetData,
      loading,
    },
  ] = useGetGenreSetLazyQuery();

  const [id, setId] = useState<string>('');

  const deleteGenreSet = async (open_id: string) => {
    setId(open_id);
    handlers.open();
    await getGenreSet({
      variables: {
        input: {
          id: open_id,
        },
      },
    });
  };

  const onDelete = async () => {
    await deleteGenreSetMutation({
      variables: {
        input: {
          id,
        },
      },
      onCompleted: () => {
        successNotification({ message: 'ジャンルセットを削除しました' });
        handlers.close();
      },
      onError: () => {
        errorNotification({ message: 'ジャンルセットの削除に失敗しました' });
      },
      refetchQueries: ['GetGenreSets'],
    });
  };

  const modalProps = {
    opened,
    onClose: handlers.close,
    onConfirm: onDelete,
    data: genreSetData?.getGenreSet,
    loading,
    buttonLoading: mutationLoading,
  };

  return {
    deleteGenreSetModal: <DeleteGenreSetModal {...modalProps} />,
    deleteGenreSet,
  };
};
