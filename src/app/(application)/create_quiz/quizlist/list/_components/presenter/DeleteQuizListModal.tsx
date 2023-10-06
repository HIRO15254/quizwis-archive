'use client';

import {
  Button,
  Group, LoadingOverlay,
  Modal, ModalProps, Text,
} from '@mantine/core';
import { getHotkeyHandler } from '@mantine/hooks';
import React from 'react';

import { QuizListDataFragment } from 'gql';
// 各種import

interface Props extends ModalProps {
  data: QuizListDataFragment | undefined
  onConfirm: () => void
  loading?: boolean
  buttonLoading?: boolean
}

/**
 * クイズリストを削除するためのモーダル
 */
export const DeleteQuizListModal: React.FC<Props> = (props) => {
  const {
    data,
    onConfirm,
    loading = false,
    buttonLoading = false,
    ...other
  } = props;

  return (
    <Modal
      title="問題セット削除"
      onKeyDown={getHotkeyHandler([
        ['mod+Enter', onConfirm],
      ])}
      {...other}
    >
      <LoadingOverlay visible={loading} />
      <Text mb="xs">{`問題セット「${data?.name}」を本当に削除しますか？`}</Text>
      <Text>削除すると、問題セット内のすべての問題も削除されます。</Text>
      <Group justify="flex-end" mt="md">
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
