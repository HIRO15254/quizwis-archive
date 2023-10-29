'use client';

import {
  Button,
  Group, LoadingOverlay, Modal, ModalProps, Stack,
} from '@mantine/core';
import { getHotkeyHandler } from '@mantine/hooks';
import React from 'react';

interface Props extends ModalProps {
  loading?: boolean;
  button: React.ReactNode;
  buttonLoading?: boolean;
  onSubmit: () => void;
  children: React.ReactNode;
}

/**
 * フォームを持つモーダル
 */
export const FormModal: React.FC<Props> = (props) => {
  const {
    loading = false,
    button,
    buttonLoading = false,
    onSubmit,
    children,
    ...other
  } = props;

  return (
    <Modal
      {...other}
      onKeyDown={getHotkeyHandler([
        ['mod+Enter', onSubmit],
      ])}
    >
      <form onSubmit={onSubmit}>
        <Stack>
          <LoadingOverlay visible={loading} />
          {children}
          <Group justify="flex-end">
            {typeof button === 'string' && (
              <Button type="submit" loading={buttonLoading}>
                {button}
              </Button>
            )}
            {typeof button !== 'string' && button}
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};
