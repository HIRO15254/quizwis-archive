// 各種import
import {
  ModalProps,
} from '@mantine/core';
import React, { ReactNode } from 'react';

import { FormModal } from '../../../../../../../components/common/FormModal';

interface Props extends ModalProps {
  quizListForm: ReactNode;
  onSubmit: () => void;
  loading?: boolean;
  buttonLoading?: boolean;
}

/**
 * ジャンルセットを作成するモーダル
 */
export const CreateQuizListModal: React.FC<Props> = (props) => {
  const {
    quizListForm,
    ...other
  } = props;

  return (
    <FormModal
      title="新規問題セット作成"
      button="作成"
      {...other}
    >
      {quizListForm}
    </FormModal>
  );
};
