import { isNotEmpty, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import React from 'react';

import { useCreateQuizListMutation, useGetGenreSetsQuery } from 'gql';
import { errorNotification, successNotification } from 'util/notifications';

import { CreateQuizListModal } from '../_components/presenter/CreateQuizListModal';

import type { QuizListFormType } from '../_types/QuizListFormType';

export const useCreateQuizListModal = () => {
  const [opened, handlers] = useDisclosure(false);
  const [
    createQuizList,
    { loading: mutationLoading },
  ] = useCreateQuizListMutation();
  const {
    data: genreSetData,
    loading,
  } = useGetGenreSetsQuery();

  const form = useForm<QuizListFormType>({
    initialValues: {
      name: '',
      description: '',
      genreSetId: '',
      useGoal: false,
      goal: 100,
    },
    validate: {
      name: isNotEmpty('このフィールドは必須です'),
    },
  });

  const open = () => {
    form.reset();
    handlers.open();
  };

  const onSubmit = form.onSubmit(async (values) => {
    await createQuizList({
      variables: {
        input: {
          name: values.name,
          description: values.description,
          genreSetId: values.genreSetId,
          goal: values.useGoal ? values.goal : 0,
        },
      },
      onCompleted: () => {
        successNotification({ message: '問題リストを作成しました' });
        handlers.close();
      },
      onError: () => {
        errorNotification({ message: '問題リストの作成に失敗しました' });
      },
      refetchQueries: ['GetQuizLists'],
    });
  });

  const modalProps = {
    opened,
    onClose: handlers.close,
    onSubmit,
    form,
    genreSetData: genreSetData?.getGenreSets ?? [],
    loading,
    buttonLoading: mutationLoading,
  };

  return {
    createQuizListModal: <CreateQuizListModal {...modalProps} />,
    createQuizList: open,
  };
};
