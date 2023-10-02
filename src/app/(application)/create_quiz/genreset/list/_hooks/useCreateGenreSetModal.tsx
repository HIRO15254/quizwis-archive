import { isNotEmpty, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import React from 'react';

import { CreateGenreSetInput, useCreateGenreSetMutation } from 'gql';
import { errorNotification, successNotification } from 'util/notifications';

import { CreateGenreSetModal } from '../_components/presenter/CreateGenreSetModal';

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

  const form = useForm<CreateGenreSetInput>({
    initialValues: {
      name: '',
      description: '',
    },
    validate: {
      name: isNotEmpty('このフィールドは必須です'),
    },
  });

  const createGenreSet = () => {
    form.reset();
    handlers.open();
  };

  const onSubmit = form.onSubmit(async (values) => {
    await createGenreSetMutation({
      variables: {
        input: values,
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
    submitButtonLoading: loading,
    form,
  };

  return {
    createGenreSetModal: <CreateGenreSetModal {...createGenreSetModalProps} />,
    createGenreSet,
  };
};
