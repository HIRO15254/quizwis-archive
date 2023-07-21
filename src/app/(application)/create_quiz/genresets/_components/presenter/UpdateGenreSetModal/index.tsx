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
import React from 'react';

export interface UpdateGenreSetFormType {
  name: string;
  description?: string | null | undefined;
}

interface UpdateGenreSetModalProps {
  opened: boolean;
  onClose: () => void;
  form: UseFormReturnType<UpdateGenreSetFormType>;
  onSubmit: () => void;
}

/**
 * クイズリストを新たに作成するためのモーダル
 */
export const UpdateGenreSetModal: React.FC<UpdateGenreSetModalProps> = (props) => {
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
      title={<Title order={3}>ジャンルセット編集</Title>}
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
              更新
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};
