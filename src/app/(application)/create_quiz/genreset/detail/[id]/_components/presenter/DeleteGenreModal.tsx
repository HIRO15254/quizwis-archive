'use client';

import {
  Button,
  Group, LoadingOverlay,
  Modal, ModalProps, Text,
} from '@mantine/core';
import { getHotkeyHandler } from '@mantine/hooks';
import React from 'react';

import { GenreDataFragment } from 'gql';
// 各種import

interface Props extends ModalProps {
  data: GenreDataFragment | undefined
  onConfirm: () => void
  loading?: boolean
  buttonLoading?: boolean
}

/**
 * クイズリストを削除するためのモーダル
 */
export const DeleteGenreModal: React.FC<Props> = (props) => {
  const {
    data,
    onConfirm,
    loading = false,
    buttonLoading = false,
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
      <Text mb="xs">{`ジャンル「${data?.name}」を本当に削除しますか？`}</Text>
      <Text mb="xs">削除すると、サブジャンルもすべて削除され、このジャンルやサブジャンルが使用されているすべての問題はジャンルなしになります。</Text>
      <Text>新たな問題セット用にジャンルセットを変更する場合は、ジャンルセットをコピーしてからの編集を推奨します。</Text>
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
