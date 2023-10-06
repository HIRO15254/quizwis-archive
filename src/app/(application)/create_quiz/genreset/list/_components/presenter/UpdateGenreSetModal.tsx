// 各種import
import {
  Button, Group, LoadingOverlay, Modal, ModalProps, Stack,
} from '@mantine/core';
import { getHotkeyHandler } from '@mantine/hooks';
import React, { ReactNode } from 'react';

export interface Props extends ModalProps {
  genreSetForm: ReactNode;
  onSubmit: () => void;
  loading?: boolean;
  submitButtonLoading?: boolean;
}

/**
 * ジャンルセットを作成するモーダル
 */
export const UpdateGenreSetModal: React.FC<Props> = (props) => {
  const {
    genreSetForm,
    onSubmit,
    loading = false,
    submitButtonLoading = false,
    ...other
  } = props;

  return (
    <Modal
      title="ジャンルセット情報編集"
      onKeyDown={getHotkeyHandler([
        ['mod+Enter', onSubmit],
      ])}
      {...other}
    >
      <form onSubmit={onSubmit}>
        <Stack>
          <LoadingOverlay visible={loading} />
          {genreSetForm}
          <Group justify="flex-end">
            <Button
              type="submit"
              loading={submitButtonLoading}
            >
              更新
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};
