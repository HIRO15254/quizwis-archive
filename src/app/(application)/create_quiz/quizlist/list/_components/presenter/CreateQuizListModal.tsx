// 各種import
import {
  Button, Group, LoadingOverlay, Modal, ModalProps, Stack,
} from '@mantine/core';
import { getHotkeyHandler } from '@mantine/hooks';
import React, { ReactNode } from 'react';

export interface Props extends ModalProps {
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
    onSubmit,
    loading = false,
    buttonLoading = false,
    ...other
  } = props;

  return (
    <Modal
      title="新規問題セット作成"
      onKeyDown={getHotkeyHandler([
        ['mod+Enter', onSubmit],
      ])}
      {...other}
    >
      <form onSubmit={onSubmit}>
        <Stack>
          <LoadingOverlay visible={loading} />
          {quizListForm}
          <Group position="right">
            <Button
              type="submit"
              loading={buttonLoading}
            >
              作成
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};
