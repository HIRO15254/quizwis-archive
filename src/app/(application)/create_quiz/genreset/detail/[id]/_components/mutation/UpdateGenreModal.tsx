// 各種import
import {
  Button, Group, LoadingOverlay, Modal, ModalProps, Stack,
} from '@mantine/core';
import { getHotkeyHandler } from '@mantine/hooks';
import React, { ReactNode } from 'react';

import { FormModal } from '../../../../../../../../components/common/FormModal';

export interface Props extends ModalProps {
  genreForm: ReactNode;
  onSubmit: () => void;
  loading?: boolean;
  buttonLoading?: boolean;
}

/**
 * ジャンルセットを作成するモーダル
 */
export const UpdateGenreModal: React.FC<Props> = (props) => {
  const {
    genreForm,
    ...other
  } = props;

  return (
    <FormModal
      title="ジャンル編集"
      button="更新"
      {...other}
    >
      {genreForm}
    </FormModal>
  );
};
