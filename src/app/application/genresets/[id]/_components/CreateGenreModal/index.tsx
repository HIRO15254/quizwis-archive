import {
  ModalProps,
} from '@mantine/core';
import React, { ReactNode } from 'react';

import { FormModal } from 'components/modals/FormModal';

interface Props extends ModalProps {
  genreForm: ReactNode;
  onSubmit: () => void;
  loading?: boolean;
  buttonLoading?: boolean;
}

/**
 * ジャンルセットを作成するモーダル
 */
export const CreateGenreModal: React.FC<Props> = (props) => {
  const {
    genreForm,
    ...other
  } = props;

  return (
    <FormModal
      title="新規ジャンル作成"
      button="作成"
      {...other}
    >
      {genreForm}
    </FormModal>
  );
};
