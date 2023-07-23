'use client';

import {
  Text,
} from '@mantine/core';
import React from 'react';

import { ConfirmModal, ConfirmModalProps } from 'components/common/ConfirmModal';
// 各種import

interface DeleteGenreSetModalProps extends ConfirmModalProps {
  name: string;
}

/**
 * クイズリストを削除するためのモーダル
 */
export const DeleteGenreSetModal: React.FC<DeleteGenreSetModalProps> = (props) => {
  const {
    name,
    ...other
  } = props;

  return (
    <ConfirmModal
      {...other}
    >
      <Text>
        {`ジャンルセット「${name}」を本当に削除しますか？`}
        <br />
        削除した場合、このジャンルセットが使用されているすべての問題リストはジャンルなしになります。
      </Text>
    </ConfirmModal>
  );
};
