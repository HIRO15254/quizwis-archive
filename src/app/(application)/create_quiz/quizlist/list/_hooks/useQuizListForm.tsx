import { isNotEmpty, useForm } from '@mantine/form';
import React from 'react';

import { QuizListInputData, useGetGenreSetsQuery } from '../../../../../../gql';
import { QuizListForm } from '../_components/presenter/QuizListForm';
import { QuizListFormType } from '../_types/QuizListFormType';

export const useQuizListForm = () => {
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

  const toQuizListInput = (formValues: QuizListFormType) : QuizListInputData => ({
    name: formValues.name,
    description: formValues.description,
    genreSetId: formValues.genreSetId,
    goal: formValues.useGoal ? formValues.goal : null,
  });

  return {
    form,
    toQuizListInput,
    loading,
    quizListForm: <QuizListForm form={form} genreSetData={genreSetData?.getGenreSets ?? []} />,
  };
};
