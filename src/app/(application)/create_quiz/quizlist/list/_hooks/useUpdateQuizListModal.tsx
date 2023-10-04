import { useDisclosure } from '@mantine/hooks';
import React, { useState } from 'react';

import { useUpdateQuizListMutation, useGetQuizListLazyQuery } from 'gql';
import { errorNotification, successNotification } from 'util/notifications';

import { useQuizListForm } from './useQuizListForm';
import { UpdateQuizListModal } from '../_components/presenter/UpdateQuizListModal';

export const useUpdateQuizListModal = () => {
  const [opened, handlers] = useDisclosure(false);
  const [
    updateQuizList,
    { loading: mutationLoading },
  ] = useUpdateQuizListMutation();
  const [
    getQuizList,
    { loading: getQuizListLoading },
  ] = useGetQuizListLazyQuery();
  const [id, setId] = useState<string>('');

  const {
    form,
    loading: quizListFormLoading,
    quizListForm,
    toQuizListInput,
  } = useQuizListForm();

  const open = async (openId: string) => {
    setId(openId);
    form.reset();
    handlers.open();
    await getQuizList({
      variables: {
        input: {
          id: openId,
        },
      },
      onCompleted: (res) => {
        form.setValues({
          name: res.getQuizList.name,
          description: res.getQuizList.description,
          genreSetId: res.getQuizList.genreSet?.id,
          useGoal: !!res.getQuizList.goal && res.getQuizList.goal > 0,
          goal: res.getQuizList.goal ?? 100,
        });
      },
    });
  };

  const onSubmit = form.onSubmit(async (values) => {
    await updateQuizList({
      variables: {
        input: {
          id,
          data: toQuizListInput(values),
        },
      },
      onCompleted: () => {
        successNotification({ message: '問題リストを更新しました' });
        handlers.close();
      },
      onError: () => {
        errorNotification({ message: '問題リストの更新に失敗しました' });
      },
      refetchQueries: ['GetQuizLists'],
    });
  });

  const modalProps = {
    opened,
    onClose: handlers.close,
    onSubmit,
    quizListForm,
    loading: getQuizListLoading || quizListFormLoading,
    buttonLoading: mutationLoading,
  };

  return {
    updateQuizListModal: <UpdateQuizListModal {...modalProps} />,
    updateQuizList: open,
  };
};
