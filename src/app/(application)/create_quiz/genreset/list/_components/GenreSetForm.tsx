import { Textarea, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import React from 'react';

import { GenreSetFormType } from '../_types/GenreSetFormType';

interface Props {
  form: UseFormReturnType<GenreSetFormType>
}
export const GenreSetForm: React.FC<Props> = (props) => {
  const { form } = props;
  return (
    <>
      <TextInput
        withAsterisk
        label="ジャンルセット名"
        {...form.getInputProps('name')}
      />
      <Textarea
        label="ジャンルセットの説明"
        autosize
        minRows={2}
        {...form.getInputProps('description')}
      />
    </>
  );
};