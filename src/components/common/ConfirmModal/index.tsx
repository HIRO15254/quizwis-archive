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
  buttonClassNames?: {
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
    buttonClassNames,
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
            color="gray"
            className={buttonClassNames?.cancel}
            onClick={other.onClose}
          >
            {button.cancel}
          </Button>
        )}
        {typeof button.cancel !== 'string' && button.cancel}
        {typeof button.confirm === 'string' && (
          <Button
            className={buttonClassNames?.confirm}
            loading={buttonLoading}
            onClick={onConfirm}
          >
            {button.confirm}
          </Button>
        )}
        {typeof button.confirm !== 'string' && button.confirm}
      </Group>
    </Modal>
  );
};
