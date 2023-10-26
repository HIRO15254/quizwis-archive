import { ModalProps } from '@mantine/core';
import React, { ReactNode } from 'react';

import { FormModal } from 'components/modals/FormModal';

interface Props extends ModalProps {
  genreSetForm: ReactNode;
  onSubmit: () => void;
  buttonLoading?: boolean;
}

/**
 * ジャンルセットを作成するモーダル
 */
export const CreateGenreSetModal: React.FC<Props> = (props) => {
  const {
    genreSetForm,
    ...other
  } = props;

  return (
    <FormModal
      title="新規ジャンルセット作成"
      button="作成"
      {...other}
    >
      {genreSetForm}
    </FormModal>
  );
};
