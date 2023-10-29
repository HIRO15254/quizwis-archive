/* eslint-disable react/no-danger */
import { Text, ModalProps } from '@mantine/core';
import React from 'react';

import { ConfirmModal } from 'components/modals/ConfirmModal';
import { QuizDataFragment } from 'gql';

interface Props extends ModalProps {
  data?: QuizDataFragment
  onConfirm: () => void
  loading?: boolean
  buttonLoading?: boolean
}

/**
 * クイズリストを削除するためのモーダル
 */
export const DeleteQuizModal: React.FC<Props> = (props) => {
  const {
    data,
    ...other
  } = props;

  return (
    <ConfirmModal
      {...other}
      title="問題削除"
      button={{
        confirm: '削除',
        cancel: 'キャンセル',
      }}
      buttonColor={{
        confirm: 'red',
      }}
    >
      <Text>
        この問題を削除しますか？
      </Text>
      {data && (
        <>
          <Text size="lg" fw={700} mt="md">
            問題文
          </Text>
          <div dangerouslySetInnerHTML={{ __html: data.question ?? '' }} />
          <Text size="lg" fw={700} mt="md">
            解答
          </Text>
          <div dangerouslySetInnerHTML={{ __html: data.answer ?? '' }} />
        </>
      )}
    </ConfirmModal>
  );
};
