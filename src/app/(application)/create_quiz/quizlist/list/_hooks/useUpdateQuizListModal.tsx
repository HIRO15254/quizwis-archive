import { isNotEmpty, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import React, { useState } from 'react';

import { useUpdateQuizListMutation, useGetQuizListLazyQuery, useGetGenreSetsQuery } from 'gql';
import { errorNotification, successNotification } from 'util/notifications';

import { UpdateQuizListModal } from '../_components/presenter/UpdateQuizListModal';
import { QuizListFormType } from '../_types/QuizListFormType';

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
  const {
    data: genreSetData,
    loading: getGenreSetLoading,
  } = useGetGenreSetsQuery();
  const [id, setId] = useState<string>('');

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
          useGoal: res.getQuizList.goal > 0,
          goal: res.getQuizList.goal,
        });
      },
    });
  };

  const onSubmit = form.onSubmit(async (values) => {
    await updateQuizList({
      variables: {
        input: {
          id,
          name: values.name,
          description: values.description,
          genreSetId: values.genreSetId ?? undefined,
          goal: values.useGoal ? values.goal : 0,
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
    form,
    genreSetData: genreSetData?.getGenreSets ?? [],
    loading: getQuizListLoading || getGenreSetLoading,
    buttonLoading: mutationLoading,
  };

  return {
    updateQuizListModal: <UpdateQuizListModal {...modalProps} />,
    updateQuizList: open,
  };
};