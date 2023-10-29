import { isNotEmpty, useForm } from '@mantine/form';
import React from 'react';

import { GenreForm } from '../_components/GenreForm';
import { GenreFormType } from '../_types/GenreFormType';

export const useGenreForm = () => {
  const form = useForm<GenreFormType>({
    initialValues: {
      name: '',
      description: '',
      ratio: 5,
      color: 'gray',
    },
    validate: {
      name: isNotEmpty('このフィールドは必須です'),
    },
  });
  return {
    form,
    genreForm: <GenreForm form={form} />,
  };
};
