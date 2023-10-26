'use client';

import { ModalProps, Text } from '@mantine/core';
import React from 'react';

import { ConfirmModal } from 'components/modals/ConfirmModal';
import { GenreDataFragment } from 'gql';

interface Props extends ModalProps {
  data: GenreDataFragment | undefined
  onConfirm: () => void
  buttonLoading?: boolean
}

/**
 * クイズリストを削除するためのモーダル
 */
export const DeleteGenreModal: React.FC<Props> = (props) => {
  const {
    data,
    ...other
  } = props;

  return (
    <ConfirmModal
      {...other}
      title="ジャンル削除"
      button={{
        confirm: '削除',
        cancel: 'キャンセル',
      }}
      buttonColor={{
        confirm: 'red',
      }}
    >
      <Text mb="xs">{`ジャンル「${data?.name}」を本当に削除しますか？`}</Text>
      <Text mb="xs">削除すると、サブジャンルもすべて削除され、このジャンルやサブジャンルが使用されているすべての問題はジャンルなしになります。</Text>
      <Text>新たな問題セット用にジャンルを変更する場合は、ジャンルセットをコピーしてからの編集を推奨します。</Text>
    </ConfirmModal>
  );
};
