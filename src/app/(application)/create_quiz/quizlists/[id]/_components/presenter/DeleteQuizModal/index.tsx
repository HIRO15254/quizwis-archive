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

interface DeleteQuizModalProps {
  opened: boolean;
  onClose: () => void;
  onDelete: () => void;
}

/**
 * クイズリストを削除するためのモーダル
 */
export const DeleteQuizModal: React.FC<DeleteQuizModalProps> = (props) => {
  const {
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
        この問題を削除しますか？
        <br />
        削除した問題は復元できません。
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
