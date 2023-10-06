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
export const UpdateQuizListModal: React.FC<Props> = (props) => {
  const {
    quizListForm,
    onSubmit,
    loading = false,
    buttonLoading = false,
    ...other
  } = props;

  return (
    <Modal
      title="問題リスト更新"
      onKeyDown={getHotkeyHandler([
        ['mod+Enter', onSubmit],
      ])}
      {...other}
    >
      <form onSubmit={onSubmit}>
        <Stack>
          <LoadingOverlay visible={loading} />
          {quizListForm}
          <Group justify="flex-end">
            <Button
              type="submit"
              loading={buttonLoading}
            >
              更新
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};
