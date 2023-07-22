'use client';

import {
  Button,
  Group,
  Modal,
  Stack,
  TextInput,
  Title,
  Textarea,
} from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
// 各種import
import React from 'react';

// Propsの型定義
export interface CreateGenreSetFormType {
  name: string;
  description?: string | null | undefined;
}

interface CreateGenreSetModalProps {
  opened: boolean;
  onClose: () => void;
  form: UseFormReturnType<CreateGenreSetFormType>;
  onSubmit: () => void;
}

/**
 * クイズリストを新たに作成するためのモーダル
 */
export const CreateGenreSetModal: React.FC<CreateGenreSetModalProps> = (props) => {
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
      title={<Title order={3}>新規ジャンルセット</Title>}
    >
      <form onSubmit={onSubmit}>
        <Stack>
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
