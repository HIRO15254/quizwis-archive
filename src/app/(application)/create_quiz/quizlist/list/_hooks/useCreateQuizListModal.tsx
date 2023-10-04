import { useDisclosure } from '@mantine/hooks';
import React from 'react';

import { useCreateQuizListMutation, useGetGenreSetsQuery } from 'gql';
import { errorNotification, successNotification } from 'util/notifications';

import { CreateQuizListModal } from '../_components/presenter/CreateQuizListModal';
import { quizListMutationInputData, useQuizListForm } from '../utils/quizListFormUtils';

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

  const form = useQuizListForm();

  const open = () => {
    form.reset();
    handlers.open();
  };

  const onSubmit = form.onSubmit(async (values) => {
    await createQuizList({
      variables: {
        input: {
          data: quizListMutationInputData(values),
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
