import { isNotEmpty, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import React, { useState } from 'react';

import {
  useCreateGenreMutation,
  useGetGenreLazyQuery,
} from 'gql';
import { errorNotification, successNotification } from 'util/notifications';

import { CreateGenreModal } from '../_components/presenter/CreateGenreModal';
import { GenreFormType } from '../_types/GenreFormType';

type Props = {
  genreSetId: string;
};

/**
 * ジャンルを新規作成するためのモーダル
 */
export const useCreateGenreModal = (props: Props) => {
  const { genreSetId } = props;

  const [opened, handlers] = useDisclosure();
  const [parentGenreId, setParentGenreId] = useState<string | undefined>(undefined);
  const [
    createGenre,
    { loading: createGenreLoading },
  ] = useCreateGenreMutation();
  const [
    getGenre,
    { loading: getGenreLoading },
  ] = useGetGenreLazyQuery();

  const form = useForm<GenreFormType>({
    initialValues: {
      name: '',
      description: '',
      ratio: 5,
      color: 'gray',
    },
    validate: {
      name: isNotEmpty('このフィールドは必須です'),
    },
  });

  const open = (openParentGenreId?: string) => {
    setParentGenreId(openParentGenreId);
    form.reset();
    handlers.open();
    if (openParentGenreId) {
      getGenre({
        variables: {
          input: {
            id: openParentGenreId,
          },
        },
        onCompleted: (res) => {
          form.setValues({ color: res.getGenre.color });
        },
      });
    }
  };

  const onSubmit = form.onSubmit(async (values) => {
    await createGenre({
      variables: {
        input: {
          genreSetId,
          parentGenreId,
          ...values,
        },
      },
      onCompleted: () => {
        successNotification({ message: 'ジャンルを作成しました' });
        handlers.close();
      },
      onError: () => {
        errorNotification({ message: 'ジャンルの作成に失敗しました' });
      },
      refetchQueries: ['GetGenreDetailPageData'],
    });
  });

  const createGenreModalProps = {
    opened,
    onClose: handlers.close,
    onSubmit,
    form,
    loading: getGenreLoading,
    buttonLoading: createGenreLoading,
  };

  return {
    createGenreModal: <CreateGenreModal {...createGenreModalProps} />,
    createGenre: open,
  };
};
