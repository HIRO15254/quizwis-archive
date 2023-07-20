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

interface DeleteGenreSetModalProps {
  name: string;
  opened: boolean;
  onClose: () => void;
  onDelete: () => void;
}

/**
 * クイズリストを削除するためのモーダル
 */
export const DeleteGenreSetModal: React.FC<DeleteGenreSetModalProps> = (props) => {
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
      title={<Title order={3}>ジャンルセット削除</Title>}
    >
      <Text>
        {`ジャンルセット${name}を本当に削除しますか？`}
        <br />
        削除した場合、このジャンルセットが使用されているすべての問題リストはジャンルなしになります。
      </Text>
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
