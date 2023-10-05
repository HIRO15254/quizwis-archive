import { useDisclosure } from '@mantine/hooks';
import React, { useState } from 'react';

import { useUpdateGenreSetMutation, useGetGenreSetLazyQuery } from 'gql';
import { errorNotification, successNotification } from 'util/notifications';

import { useGenreSetForm } from './useGenreSetForm';
import { UpdateGenreSetModal } from '../_components/presenter/UpdateGenreSetModal';

export const useUpdateGenreSetModal = () => {
  const [opened, handlers] = useDisclosure();
  const [
    updateGenreSet,
    { loading: mutationLoading },
  ] = useUpdateGenreSetMutation();
  const [
    getGenreSet,
    { loading },
  ] = useGetGenreSetLazyQuery();
  const [
    id,
    setId,
  ] = useState<string>('');

  const {
    form,
    genreSetForm,
  } = useGenreSetForm();

  const open = async (open_id: string) => {
    form.reset();
    handlers.open();
    setId(open_id);
    await getGenreSet({
      variables: {
        input: {
          id: open_id,
        },
      },
      onCompleted: (res) => {
        form.setValues({
          name: res.getGenreSet?.name ?? '',
          description: res.getGenreSet?.description ?? '',
        });
      },
    });
  };

  const onSubmit = form.onSubmit(async (values) => {
    await updateGenreSet({
      variables: {
        input: {
          id,
          data: values,
        },
      },
      onCompleted: () => {
        handlers.close();
        successNotification({ message: 'ジャンルセットを更新しました' });
      },
      onError: () => {
        errorNotification({ message: 'ジャンルセットの更新に失敗しました' });
      },
      refetchQueries: ['GetGenreSets'],
    });
  });

  const modalProps = {
    opened,
    onClose: handlers.close,
    onSubmit,
    genreSetForm,
    loading,
    submitButtonLoading: mutationLoading,
  };

  return {
    updateGenreSetModal: <UpdateGenreSetModal {...modalProps} />,
    updateGenreSet: open,
  };
};
