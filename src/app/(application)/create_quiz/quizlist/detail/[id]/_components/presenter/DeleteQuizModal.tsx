'use client';

import {
  Button,
  Group,
  Text,
  Modal,
  ModalProps,
} from '@mantine/core';
import { getHotkeyHandler } from '@mantine/hooks';
import React from 'react';

// 各種import

/**
 * クイズリストを削除するためのモーダル
 */

interface Props extends ModalProps {
  onConfirm: () => void
  buttonLoading?: boolean
}

/**
 * クイズリストを削除するためのモーダル
 */
export const DeleteQuizModal: React.FC<Props> = (props) => {
  const {
    onConfirm,
    buttonLoading = false,
    ...other
  } = props;

  return (
    <Modal
      title="問題削除"
      onKeyDown={getHotkeyHandler([
        ['mod+Enter', onConfirm],
      ])}
      {...other}
    >
      <Text>
        この問題を削除しますか？
      </Text>
      <Group position="right" mt="md">
        <Button
          color="gray"
          onClick={other.onClose}
        >
          キャンセル
        </Button>
        <Button
          color="red"
          loading={buttonLoading}
          onClick={onConfirm}
        >
          削除
        </Button>
      </Group>
    </Modal>
  );
};
