'use client';

import {
  Button,
  Group,
  Modal,
  Stack,
  TextInput,
  Title,
  Textarea,
  NumberInput,
} from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
// 各種import
import React from 'react';

// Propsの型定義
export interface UpdateGenreFormType {
  name: string;
  description?: string | null | undefined;
  ratio: number;
}

interface UpdateGenreModalProps {
  opened: boolean;
  onClose: () => void;
  form: UseFormReturnType<UpdateGenreFormType>;
  onSubmit: () => void;
}

/**
 * クイズリストを新たに作成するためのモーダル
 */
export const UpdateGenreModal: React.FC<UpdateGenreModalProps> = (props) => {
  const {
    opened,
    onClose,
    form,
    onSubmit,
  } = props;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={<Title order={3}>ジャンル編集</Title>}
    >
      <form onSubmit={onSubmit}>
        <Stack>
          <TextInput
            withAsterisk
            label="ジャンル名"
            {...form.getInputProps('name')}
          />
          <Textarea
            label="ジャンルの説明"
            autosize
            minRows={2}
            {...form.getInputProps('description')}
          />
          <NumberInput
            label="ジャンルの出題比率"
            min={0}
            description="サブジャンルの場合、メインジャンルに対する出題比率を指定します。"
            {...form.getInputProps('ratio')}
          />
          <Group position="right">
            <Button type="submit">
              更新
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};
