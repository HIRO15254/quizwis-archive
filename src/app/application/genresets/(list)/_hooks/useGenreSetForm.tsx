import { isNotEmpty, useForm } from '@mantine/form';
import React from 'react';

import { GenreSetForm } from '../_components/GenreSetForm';
import { GenreSetFormType } from '../_types/GenreSetFormType';

export const useGenreSetForm = () => {
  const form = useForm<GenreSetFormType>({
    initialValues: {
      name: '',
      description: '',
    },
    validate: {
      name: isNotEmpty('このフィールドは必須です'),
    },
  });
  return {
    form,
    genreSetForm: <GenreSetForm form={form} />,
  };
};
