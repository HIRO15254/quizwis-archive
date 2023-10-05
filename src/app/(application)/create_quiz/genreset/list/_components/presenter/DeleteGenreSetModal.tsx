'use client';

import {
  Button,
  Group, LoadingOverlay,
  Modal, ModalProps, Text,
} from '@mantine/core';
import { getHotkeyHandler } from '@mantine/hooks';
import React from 'react';

import { GenreSetDataFragment } from 'gql';
// 各種import

interface Props extends ModalProps {
  data: GenreSetDataFragment | undefined
  onConfirm: () => void
  loading?: boolean
  confirmButtonLoading?: boolean
}

/**
 * クイズリストを削除するためのモーダル
 */
export const DeleteGenreSetModal: React.FC<Props> = (props) => {
  const {
    data,
    onConfirm,
    loading = false,
    confirmButtonLoading = false,
    ...other
  } = props;

  return (
    <Modal
      {...other}
      title="ジャンルセット削除"
      onKeyDown={getHotkeyHandler([
        ['mod+Enter', onConfirm],
      ])}
    >
      <LoadingOverlay visible={loading} />
      <Text mb="xs">{`ジャンルセット「${data?.name}」を本当に削除しますか？`}</Text>
      <Text>削除した場合、このジャンルセットが使用されているすべての問題リストのジャンルが「なし」に変更されます。</Text>
      <Group position="right" mt="md">
        <Button
          color="gray"
          onClick={other.onClose}
        >
          キャンセル
        </Button>
        <Button
          color="red"
          loading={confirmButtonLoading}
          onClick={onConfirm}
        >
          削除
        </Button>
      </Group>
    </Modal>
  );
};
