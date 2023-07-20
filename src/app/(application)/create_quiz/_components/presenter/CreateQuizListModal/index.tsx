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
export interface CreateQuizListFormType {
  name: string;
  description?: string | null | undefined;
}

interface CreateQuizListModalProps {
  opened: boolean;
  onClose: () => void;
  form: UseFormReturnType<CreateQuizListFormType>;
  onSubmit: () => void;
}

/**
 * クイズリストを新たに作成するためのモーダル
 */
export const CreateQuizListModal: React.FC<CreateQuizListModalProps> = (props) => {
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
      title={<Title order={3}>新規問題リスト</Title>}
    >
      <form onSubmit={onSubmit}>
        <Stack>
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
