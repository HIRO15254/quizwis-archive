'use client';

import { Text } from '@mantine/core';
import React from 'react';

import { ConfirmModal, ConfirmModalProps } from 'components/common/ConfirmModal';
// 各種import

interface DeleteQuizListModalProps extends ConfirmModalProps {
  name: string;
}

/**
 * クイズリストを削除するためのモーダル
 */
export const DeleteQuizListModal: React.FC<DeleteQuizListModalProps> = (props) => {
  const {
    name,
    ...other
  } = props;

  return (
    <ConfirmModal {...other}>
      <Text>
        {`問題リスト「${name}」を本当に削除しますか？`}
        <br />
        削除した場合、リスト内の問題もすべて削除され、これらは元に戻せません。
      </Text>
    </ConfirmModal>
  );
};
