import { ModalProps } from '@mantine/core';
import React, { ReactNode } from 'react';

import { FormModal } from 'components/modals/FormModal';

interface Props extends ModalProps {
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
