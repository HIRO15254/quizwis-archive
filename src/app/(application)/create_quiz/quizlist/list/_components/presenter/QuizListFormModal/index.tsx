'use client';

import {
  TextInput,
  Textarea,
  NativeSelect,
  SelectItem,
} from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import React from 'react';

import { FormModal, FormModalProps } from 'components/common/FormModal';

import type { QuizListFormType } from '../../../_types/QuizListFormType';

interface QuizListFormModalProps extends FormModalProps {
  form: UseFormReturnType<QuizListFormType>;
  genreSets: SelectItem[];
}

/**
 * クイズリストを新たに作成するためのモーダル
 */
export const QuizListFormModal: React.FC<QuizListFormModalProps> = (props) => {
  const {
    form,
    genreSets,
    ...other
  } = props;

  return (
    <FormModal
      {...other}
      title="新規問題リスト"
    >
      <TextInput
        withAsterisk
        label="問題リスト名"
        {...form.getInputProps('name')}
      />
      <Textarea
        label="問題リストの説明"
        autosize
        minRows={2}
        {...form.getInputProps('description')}
      />
      <NativeSelect
        label="使用するジャンルセット"
        description="ジャンルセットは割り当てなおすたびにすべての問題のジャンルがリセットされます。"
        data={genreSets}
        {...form.getInputProps('genreSetId')}
      />
    </FormModal>
  );
};
