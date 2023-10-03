// 各種import
import {
  Button, Group, LoadingOverlay, Modal, ModalProps, Stack,
} from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { getHotkeyHandler } from '@mantine/hooks';
import React from 'react';

import { GenreSetDataFragment } from 'gql';

import { QuizListForm } from './QuizListForm';
import { QuizListFormType } from '../../_types/QuizListFormType';

export interface Props extends ModalProps {
  form: UseFormReturnType<QuizListFormType>;
  genreSetData: GenreSetDataFragment[];
  onSubmit: () => void;
  loading?: boolean;
  buttonLoading?: boolean;
}

/**
 * ジャンルセットを作成するモーダル
 */
export const CreateQuizListModal: React.FC<Props> = (props) => {
  const {
    form,
    genreSetData,
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
          <QuizListForm
            form={form}
            genreSetData={genreSetData}
          />
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
