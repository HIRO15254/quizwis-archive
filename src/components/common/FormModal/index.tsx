'use client';

import {
  Button, Group, LoadingOverlay, Modal, Stack, Text,
} from '@mantine/core';
import { useHotkeys } from '@mantine/hooks';
import React from 'react';

export interface FormModalProps {
  loading?: boolean;
  submitText?: string;
  title: string;
  opened: boolean;
  close: () => void;
  onSubmit: () => void;
  children?: React.ReactNode;
}

/**
 * フォームを持つモーダル
 */
export const FormModal: React.FC<FormModalProps> = (props) => {
  const {
    loading = false,
    title,
    submitText = '更新',
    opened,
    close,
    onSubmit,
    children,
  } = props;

  useHotkeys([
    ['esc', close],
    ['mod+Enter', onSubmit],
  ]);

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={<Text fz="xl" fw={800}>{title}</Text>}
    >
      <form onSubmit={onSubmit}>
        <Stack>
          <LoadingOverlay visible={loading} />
          {children}
          <Group position="right">
            <Button type="submit">
              {submitText}
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};
