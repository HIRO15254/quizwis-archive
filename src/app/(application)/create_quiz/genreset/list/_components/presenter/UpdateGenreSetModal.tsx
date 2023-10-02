// 各種import
import {
  Button, Group, LoadingOverlay, Modal, ModalProps, Stack,
} from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { getHotkeyHandler } from '@mantine/hooks';
import React from 'react';

import { UpdateGenreSetInput } from 'gql';

import { GenreSetForm } from './GenreSetForm';

export interface Props extends ModalProps {
  form: UseFormReturnType<Omit<UpdateGenreSetInput, 'id'>>;
  onSubmit: () => void;
  loading?: boolean;
  submitButtonLoading?: boolean;
}

/**
 * ジャンルセットを作成するモーダル
 */
export const UpdateGenreSetModal: React.FC<Props> = (props) => {
  const {
    form,
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
          <GenreSetForm form={form} />
          <Group position="right">
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
