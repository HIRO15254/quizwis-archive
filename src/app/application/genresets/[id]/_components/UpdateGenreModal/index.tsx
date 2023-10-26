import { ModalProps } from '@mantine/core';
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
