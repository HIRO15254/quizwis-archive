'use client';

import {
  Button, Group, Modal, ModalProps,
} from '@mantine/core';
import { getHotkeyHandler } from '@mantine/hooks';
import React from 'react';

interface Props extends ModalProps {
  onConfirm: () => void;
  children?: React.ReactNode;
  button: {
    confirm: React.ReactNode;
    cancel: React.ReactNode;
  }
  buttonLoading?: boolean;
  buttonColor? : {
    confirm?: string;
    cancel?: string;
  }
}

/**
 * 操作の承認モーダル
 */
export const ConfirmModal: React.FC<Props> = (props) => {
  const {
    button,
    onConfirm,
    children,
    buttonLoading = false,
    buttonColor,
    ...other
  } = props;

  return (
    <Modal
      {...other}
      onKeyDown={getHotkeyHandler([
        ['mod+Enter', onConfirm],
      ])}
    >
      {children}
      <Group justify="flex-end" mt="md">
        {typeof button.cancel === 'string' && (
          <Button
            color={buttonColor?.cancel ?? 'gray'}
            onClick={other.onClose}
          >
            {button.cancel}
          </Button>
        )}
        {typeof button.cancel !== 'string' && button.cancel}
        {typeof button.confirm === 'string' && (
          <Button
            loading={buttonLoading}
            onClick={onConfirm}
            color={buttonColor?.confirm}
          >
            {button.confirm}
          </Button>
        )}
        {typeof button.confirm !== 'string' && button.confirm}
      </Group>
    </Modal>
  );
};
