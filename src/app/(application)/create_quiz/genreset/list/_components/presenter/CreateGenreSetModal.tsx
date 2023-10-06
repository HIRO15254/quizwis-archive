// 各種import
import {
  Button, Group, Modal, ModalProps, Stack,
} from '@mantine/core';
import { getHotkeyHandler } from '@mantine/hooks';
import React, { ReactNode } from 'react';

export interface Props extends ModalProps {
  genreSetForm: ReactNode;
  onSubmit: () => void;
  submitButtonLoading?: boolean;
}

/**
 * ジャンルセットを作成するモーダル
 */
export const CreateGenreSetModal: React.FC<Props> = (props) => {
  const {
    genreSetForm,
    onSubmit,
    submitButtonLoading = false,
    ...other
  } = props;

  return (
    <Modal
      title="新規ジャンルセット作成"
      onKeyDown={getHotkeyHandler([
        ['mod+Enter', onSubmit],
      ])}
      {...other}
    >
      <form onSubmit={onSubmit}>
        <Stack>
          {genreSetForm}
          <Group justify="flex-end">
            <Button
              type="submit"
              loading={submitButtonLoading}
            >
              作成
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};
