import { isNotEmpty, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import React, { useState } from 'react';

import { useUpdateGenreSetMutation, useGetGenreSetLazyQuery, UpdateGenreSetInput } from 'gql';
import { errorNotification, successNotification } from 'util/notifications';

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

  const form = useForm<Omit<UpdateGenreSetInput, 'id'>>({
    initialValues: {
      name: '',
      description: '',
    },
    validate: {
      name: isNotEmpty('このフィールドは必須です'),
    },
  });

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
          ...values,
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
    form,
    loading,
    submitButtonLoading: mutationLoading,
  };

  return {
    updateGenreSetModal: <UpdateGenreSetModal {...modalProps} />,
    updateGenreSet: open,
  };
};
