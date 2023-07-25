// "use client";

// 各種import
import {
  TextInput, Textarea, NativeSelect, MANTINE_COLORS, NumberInput, Text, Grid,
} from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import React from 'react';

import { FormModal, FormModalProps } from 'components/common/FormModal';
import { GenreBadge } from 'components/common/GenreBadge';

import type { GenreFormType } from '../../../_types/GenreFormType';

interface GenreFormModalProps extends FormModalProps {
  form: UseFormReturnType<GenreFormType>;
  continue: boolean;
}

/**
 * ジャンル関係のモーダルの共通部分
 */
export const GenreFormModal: React.FC<GenreFormModalProps> = (props) => {
  const {
    form,
    ...other
  } = props;

  return (
    <FormModal
      {...other}
    >
      <Grid>
        <Grid.Col span={8}>
          <TextInput
            withAsterisk
            label="ジャンル名"
            {...form.getInputProps('name')}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <NativeSelect
            label="ジャンルの色"
            data={MANTINE_COLORS}
            {...form.getInputProps('color')}
          />
        </Grid.Col>
      </Grid>
      <Text size="sm">
        プレビュー
        <br />
        <GenreBadge color={form.values.color}>
          {form.values.name}
        </GenreBadge>
      </Text>
      <Textarea
        label="ジャンルの説明"
        autosize
        minRows={2}
        {...form.getInputProps('description')}
      />
      <NumberInput
        label="ジャンルの出題比率"
        description="サブジャンルの場合、親ジャンル内での出題比率を指定します。"
        min={0}
        {...form.getInputProps('ratio')}
      />
    </FormModal>
  );
};
