// "use client";

// 各種import
import {
  TextInput, Textarea,
} from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import React from 'react';

import { FormModal, FormModalProps } from 'components/common/FormModal';

import type { GenreSetFormType } from '../../../_types/GenreSetFormType';

interface GenreSetFormModalProps extends FormModalProps {
  form: UseFormReturnType<GenreSetFormType>;
}

/**
 * ジャンル関係のモーダルの共通部分
 */
export const GenreSetFormModal: React.FC<GenreSetFormModalProps> = (props) => {
  const {
    form,
    ...other
  } = props;

  return (
    <FormModal
      {...other}
    >
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
    </FormModal>
  );
};
