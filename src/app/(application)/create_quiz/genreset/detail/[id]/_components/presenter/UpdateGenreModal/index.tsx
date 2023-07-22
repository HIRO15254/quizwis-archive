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
  Badge,
  Text,
  MANTINE_COLORS,
  NativeSelect,
} from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
// 各種import
import React from 'react';

// Propsの型定義
export interface UpdateGenreFormType {
  name: string;
  description?: string | null | undefined;
  ratio: number;
  color: string;
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
            description="10文字以下を推奨します"
            {...form.getInputProps('name')}
          />
          <Textarea
            label="ジャンルの説明"
            autosize
            minRows={2}
            {...form.getInputProps('description')}
          />
          <NativeSelect
            label="ジャンルの色"
            data={MANTINE_COLORS}
            {...form.getInputProps('color')}
          />
          <NumberInput
            label="ジャンルの出題比率"
            min={0}
            description="サブジャンルの場合、親ジャンル内での出題比率を指定します。"
            {...form.getInputProps('ratio')}
          />
          <Text size="sm">
            プレビュー
            <br />
            <Badge variant="light" color={form.values.color}>
              {form.values.name}
            </Badge>
          </Text>
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
