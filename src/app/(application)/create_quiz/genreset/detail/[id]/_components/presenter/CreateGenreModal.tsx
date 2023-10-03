// 各種import
import {
  Button, Group, LoadingOverlay, Modal, ModalProps, Stack,
} from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { getHotkeyHandler } from '@mantine/hooks';
import React from 'react';

import { GenreForm } from './GenreForm';
import { GenreFormType } from '../../_types/GenreFormType';

export interface Props extends ModalProps {
  form: UseFormReturnType<GenreFormType>;
  onSubmit: () => void;
  loading?: boolean;
  buttonLoading?: boolean;
}

/**
 * ジャンルセットを作成するモーダル
 */
export const CreateGenreModal: React.FC<Props> = (props) => {
  const {
    form,
    onSubmit,
    loading = false,
    buttonLoading = false,
    ...other
  } = props;

  return (
    <Modal
      title="新規ジャンル作成"
      onKeyDown={getHotkeyHandler([
        ['mod+Enter', onSubmit],
      ])}
      {...other}
    >
      <form onSubmit={onSubmit}>
        <Stack>
          <LoadingOverlay visible={loading} />
          <GenreForm form={form} />
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
