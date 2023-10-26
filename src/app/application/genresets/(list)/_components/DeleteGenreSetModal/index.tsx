import { ModalProps, Text } from '@mantine/core';
import React from 'react';

import { ConfirmModal } from 'components/modals/ConfirmModal';
import { GenreSetDataFragment } from 'gql';

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
      buttonColor={{
        confirm: 'red',
      }}
    >
      <Text mb="xs">{`ジャンルセット「${data?.name}」を本当に削除しますか？`}</Text>
      <Text mb="xs">
        削除すると、このジャンルセットが設定されていたすべての問題リストのジャンルセットは未設定の状態に戻り、
        当該問題リスト内のすべての問題のジャンルも未設定の状態に戻ります。
      </Text>
      <Text>この操作は取り消せません。</Text>
    </ConfirmModal>
  );
};
