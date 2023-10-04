import { isNotEmpty, useForm } from '@mantine/form';

import { QuizListInputData } from 'gql';

import { QuizListFormType } from '../_types/QuizListFormType';

export const useQuizListForm = () => useForm<QuizListFormType>({
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

export const quizListMutationInputData = (data: QuizListFormType) : QuizListInputData => ({
  name: data.name,
  description: data.description,
  genreSetId: data.genreSetId,
  goal: data.useGoal ? data.goal : null,
});
