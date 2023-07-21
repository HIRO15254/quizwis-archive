'use client';

import {
  Button,
  Group,
  Modal,
  Text,
  Title,
} from '@mantine/core';
// 各種import
import React from 'react';

interface DeleteGenreModalProps {
  name: string;
  opened: boolean;
  onClose: () => void;
  onDelete: () => void;
}

/**
 * クイズリストを削除するためのモーダル
 */
export const DeleteGenreModal: React.FC<DeleteGenreModalProps> = (props) => {
  const {
    name,
    opened,
    onClose,
    onDelete,
  } = props;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={<Title order={3}>ジャンル削除</Title>}
    >
      <Text mb="xs">{`ジャンル「${name}」を本当に削除しますか？`}</Text>
      <Text mb="xs">削除すると、サブジャンルもすべて削除され、このジャンルやサブジャンルが使用されているすべての問題はジャンルなしになります。</Text>
      <Text>新たな問題セット用にジャンルセットを変更する場合は、ジャンルセットをコピーしてからの編集を推奨します。</Text>
      <Group position="right" mt="md">
        <Button
          color="gray"
          onClick={onClose}
        >
          キャンセル
        </Button>
        <Button
          color="red"
          onClick={onDelete}
        >
          削除
        </Button>
      </Group>
    </Modal>
  );
};
