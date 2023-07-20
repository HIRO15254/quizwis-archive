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
export interface CreateGenreFormType {
  name: string;
  description?: string | null | undefined;
  ratio: number;
}

interface CreateGenreModalProps {
  opened: boolean;
  onClose: () => void;
  form: UseFormReturnType<CreateGenreFormType>;
  onSubmit: () => void;
}

/**
 * クイズリストを新たに作成するためのモーダル
 */
export const CreateGenreModal: React.FC<CreateGenreModalProps> = (props) => {
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
      title={<Title order={3}>新規ジャンル</Title>}
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
            {...form.getInputProps('ratio')}
          />
          <Group position="right">
            <Button type="submit">
              作成
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};
