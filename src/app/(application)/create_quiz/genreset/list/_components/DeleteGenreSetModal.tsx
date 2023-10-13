'use client';

import { ModalProps, Text } from '@mantine/core';
import React from 'react';

import { ConfirmModal } from 'components/common/ConfirmModal';
import { GenreSetDataFragment } from 'gql';
// 各種import

interface Props extends ModalProps {
  data: GenreSetDataFragment | undefined
  onConfirm: () => void
  loading?: boolean
  buttonLoading?: boolean
}

/**
 * クイズリストを削除するためのモーダル
 */
export const DeleteGenreSetModal: React.FC<Props> = (props) => {
  const {
    data,
    ...other
  } = props;

  return (
    <ConfirmModal
      {...other}
      title="ジャンルセット削除"
      button={{
        confirm: '削除',
        cancel: 'キャンセル',
      }}
    >
      <Text mb="xs">{`ジャンルセット「${data?.name}」を本当に削除しますか？`}</Text>
      <Text>削除した場合、このジャンルセットが使用されているすべての問題リストのジャンルが「なし」に変更されます。</Text>
    </ConfirmModal>
  );
};
