import {
  Grid,
  NativeSelect,
  NumberInput,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import React from 'react';

import { GenreBadge } from 'components/parts/GenreBadge';
import { DEFAULT_COLORS } from 'styles/const';

import { GenreFormType } from '../../_types/GenreFormType';

interface Props {
  form: UseFormReturnType<GenreFormType>
}

export const GenreForm: React.FC<Props> = (props) => {
  const { form } = props;
  return (
    <>
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
            data={DEFAULT_COLORS}
            {...form.getInputProps('color')}
          />
        </Grid.Col>
      </Grid>
      <Text size="sm">
        プレビュー
        <br />
        <GenreBadge
          genre={{
            ...form.values,
            id: 'preview',
          }}
        />
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
    </>
  );
};
