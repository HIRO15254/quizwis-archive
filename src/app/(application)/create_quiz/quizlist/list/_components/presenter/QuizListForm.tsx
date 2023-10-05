import {
  Checkbox, NativeSelect, NumberInput, Textarea, TextInput,
} from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import React from 'react';

import { GenreSetDataFragment } from '../../../../../../../gql';
import { QuizListFormType } from '../../_types/QuizListFormType';

interface Props {
  form: UseFormReturnType<QuizListFormType>;
  genreSetData: GenreSetDataFragment[];
}
export const QuizListForm: React.FC<Props> = (props) => {
  const {
    form,
    genreSetData,
  } = props;

  const genreSetSelectData = [{ value: '', label: 'なし' }].concat(
    genreSetData.map((genreSet) => ({
      value: genreSet.id,
      label: genreSet.name,
    })) ?? [],
  );

  return (
    <>
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
      <Checkbox
        label="目標問題数を設定する"
        description="設定することでジャンルごとの問題数の目安等が表示されます。"
        {...form.getInputProps('useGoal', { type: 'checkbox' })}
      />
      {form.values.useGoal && (
        <NumberInput
          label="目標問題数"
          {...form.getInputProps('goal')}
        />
      )}
      <NativeSelect
        label="使用するジャンルセット"
        description="ジャンルセットは割り当てなおすたびにすべての問題のジャンルがリセットされます。"
        data={genreSetSelectData}
        {...form.getInputProps('genreSetId')}
      />
    </>
  );
};
