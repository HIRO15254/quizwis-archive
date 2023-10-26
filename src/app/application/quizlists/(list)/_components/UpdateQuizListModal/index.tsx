import {
  ModalProps,
} from '@mantine/core';
import React, { ReactNode } from 'react';

import { FormModal } from 'components/modals/FormModal';

export interface Props extends ModalProps {
  quizListForm: ReactNode;
  onSubmit: () => void;
  loading?: boolean;
  buttonLoading?: boolean;
}

/**
 * ジャンルセットを作成するモーダル
 */
export const UpdateQuizListModal: React.FC<Props> = (props) => {
  const {
    quizListForm,
    ...other
  } = props;

  return (
    <FormModal
      {...other}
      title="問題リスト更新"
      button="更新"
    >
      {quizListForm}
    </FormModal>
  );
};
