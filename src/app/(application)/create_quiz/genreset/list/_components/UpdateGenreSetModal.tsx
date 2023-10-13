// 各種import
import {
  Button, Group, LoadingOverlay, Modal, ModalProps, Stack,
} from '@mantine/core';
import { getHotkeyHandler } from '@mantine/hooks';
import React, { ReactNode } from 'react';

import { FormModal } from 'components/common/FormModal';

export interface Props extends ModalProps {
  genreSetForm: ReactNode;
  onSubmit: () => void;
  loading?: boolean;
  buttonLoading?: boolean;
}

/**
 * ジャンルセットを作成するモーダル
 */
export const UpdateGenreSetModal: React.FC<Props> = (props) => {
  const {
    genreSetForm,
    ...other
  } = props;

  return (
    <FormModal
      title="ジャンルセット情報編集"
      button="更新"
      {...other}
    >
      {genreSetForm}
    </FormModal>
  );
};
