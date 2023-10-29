import { useForm } from '@mantine/form';
import React from 'react';

import { QuizInputData } from 'gql';

import { QuizForm } from '../_components/QuizForm';

export const useQuizForm = () => {
  const form = useForm<QuizInputData>({
    initialValues: {
      question: '',
      answer: '',
      explanation: '',
      genreId: '',
      source: '',
      otherAnswer: '',
      length: 0,
    },
  });

  const QuizFormProps = {
    form,
  };

  return {
    form,
    quizForm: <QuizForm {...QuizFormProps} />,
  };
};
