'use client';

import {
  Text,
} from '@mantine/core';
import React from 'react';

import { ConfirmModal, type ConfirmModalProps } from 'components/common/ConfirmModal';

interface DeleteGenreModalProps extends ConfirmModalProps {
  name: string;
}

/**
 * クイズリストを削除するためのモーダル
 */
export const DeleteGenreModal: React.FC<DeleteGenreModalProps> = (props) => {
  const {
    name,
    ...other
  } = props;

  return (
    <ConfirmModal
      {...other}
    >
      <Text mb="xs">{`ジャンル「${name}」を本当に削除しますか？`}</Text>
      <Text mb="xs">削除すると、サブジャンルもすべて削除され、このジャンルやサブジャンルが使用されているすべての問題はジャンルなしになります。</Text>
      <Text>新たな問題セット用にジャンルセットを変更する場合は、ジャンルセットをコピーしてからの編集を推奨します。</Text>
    </ConfirmModal>
  );
};
