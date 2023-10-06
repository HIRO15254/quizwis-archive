'use client';

import {
  Button,
  Group,
  Modal,
  Text,
} from '@mantine/core';
import { getHotkeyHandler } from '@mantine/hooks';
import React from 'react';

export interface ConfirmModalProps {
  confirmText: string;
  title: string;
  opened: boolean;
  close: () => void;
  onConfirm: () => void;
  children?: React.ReactNode;
  confirmColor?: string;
}

/**
 * 操作の承認モーダル
 */
export const ConfirmModal: React.FC<ConfirmModalProps> = (props) => {
  const {
    confirmText = '削除',
    title,
    opened,
    close,
    onConfirm,
    children,
    confirmColor = 'blue',
  } = props;

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={<Text fz="xl" fw={800}>{title}</Text>}
      onKeyDown={getHotkeyHandler([
        ['mod+Enter', onConfirm],
      ])}
    >
      {children}
      <Group justify="flex-end" mt="md">
        <Button
          color="gray"
          onClick={close}
        >
          キャンセル
        </Button>
        <Button
          color={confirmColor}
          onClick={onConfirm}
        >
          {confirmText}
        </Button>
      </Group>
    </Modal>
  );
};
