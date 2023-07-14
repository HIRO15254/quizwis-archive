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

interface DeleteQuizListModalProps {
  name: string;
  opened: boolean;
  onClose: () => void;
  onDelete: () => void;
}

/**
 * クイズリストを削除するためのモーダル
 */
export const DeleteQuizListModal: React.FC<DeleteQuizListModalProps> = (props) => {
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
      title={<Title order={3}>問題リスト削除</Title>}
    >
      <Text>
        {`問題リスト${name}を本当に削除しますか？`}
        <br />
        削除した場合、リスト内の問題もすべて削除され、これらは元に戻せません。
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
