'use client';

import {
  ModalProps, Text,
} from '@mantine/core';
import React from 'react';

import { ConfirmModal } from 'components/common/ConfirmModal';
import { QuizListDataFragment } from 'gql';
// 各種import

interface Props extends ModalProps {
  data: QuizListDataFragment | undefined
  onConfirm: () => void
  loading?: boolean
  buttonLoading?: boolean
}

/**
 * クイズリストを削除するためのモーダル
 */
export const DeleteQuizListModal: React.FC<Props> = (props) => {
  const {
    data,
    ...other
  } = props;

  return (
    <ConfirmModal
      {...other}
      title="問題セット削除"
      button={{
        confirm: '削除',
        cancel: 'キャンセル',
      }}
      buttonClassNames={{
        confirm: 'background: red;',
      }}
    >
      <Text mb="xs">{`問題セット「${data?.name}」を本当に削除しますか？`}</Text>
      <Text>削除すると、問題セット内のすべての問題も削除されます。</Text>
    </ConfirmModal>
  );
};
