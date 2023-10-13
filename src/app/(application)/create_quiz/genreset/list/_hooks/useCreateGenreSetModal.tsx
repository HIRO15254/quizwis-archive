import { useDisclosure } from '@mantine/hooks';
import React from 'react';

import { useCreateGenreSetMutation } from 'gql';
import { errorNotification, successNotification } from 'util/notifications';

import { useGenreSetForm } from './useGenreSetForm';
import { CreateGenreSetModal } from '../_components/CreateGenreSetModal';

type Return = {
  createGenreSetModal: React.ReactNode;
  createGenreSet: () => void;
};

/**
 * ジャンルセットを作成するためのモーダルを使用するためのフック
 * @returns ジャンルセット作成モーダルと、それを表示するための関数
 */
export const useCreateGenreSetModal = (): Return => {
  const [opened, handlers] = useDisclosure();
  const [createGenreSetMutation, { loading }] = useCreateGenreSetMutation();

  const {
    form,
    genreSetForm,
  } = useGenreSetForm();

  const createGenreSet = () => {
    form.reset();
    handlers.open();
  };

  const onSubmit = form.onSubmit(async (values) => {
    await createGenreSetMutation({
      variables: {
        input: {
          data: values,
        },
      },
      onCompleted: () => {
        successNotification({ message: 'ジャンルセットを作成しました' });
        handlers.close();
      },
      onError: () => {
        errorNotification({ message: 'ジャンルセットの作成に失敗しました' });
      },
      refetchQueries: ['GetGenreSets'],
    });
  });

  const createGenreSetModalProps = {
    opened,
    onClose: handlers.close,
    onSubmit,
    buttonLoading: loading,
    genreSetForm,
  };

  return {
    createGenreSetModal: <CreateGenreSetModal {...createGenreSetModalProps} />,
    createGenreSet,
  };
};
