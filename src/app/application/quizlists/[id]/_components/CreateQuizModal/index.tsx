import { ModalProps } from '@mantine/core';
import React, { ReactNode } from 'react';

import { FormModal } from 'components/modals/FormModal';

interface Props extends ModalProps {
  quizForm: ReactNode;
  onSubmit: () => void;
  loading?: boolean;
  buttonLoading?: boolean;
}
export const CreateQuizModal: React.FC<Props> = (props) => {
  const {
    quizForm,
    ...other
  } = props;

  return (
    <FormModal
      title="新規問題作成"
      button="作成"
      size="lg"
      {...other}
    >
      {quizForm}
    </FormModal>
  );
};
