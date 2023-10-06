// 各種import
import {
  Button, Group, LoadingOverlay, Modal, ModalProps, Stack,
} from '@mantine/core';
import { getHotkeyHandler } from '@mantine/hooks';
import React, { ReactNode } from 'react';

export interface Props extends ModalProps {
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
    onSubmit,
    loading = false,
    buttonLoading = false,
    ...other
  } = props;

  return (
    <Modal
      title="ジャンル編集"
      onKeyDown={getHotkeyHandler([
        ['mod+Enter', onSubmit],
      ])}
      {...other}
    >
      <form onSubmit={onSubmit}>
        <Stack>
          <LoadingOverlay visible={loading} />
          {genreForm}
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
