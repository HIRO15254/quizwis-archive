import { isNotEmpty, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';

import { useCreateGenreMutation, useGetGenreLazyQuery } from 'gql';

import type { GenreFormType } from '../_types/GenreFormType';

type UseCreateGenreModalProps = {
  reload: () => void;
  genreSetDatabaseId: string;
};

/**
 * ジャンルを新規作成するためのモーダル
 */
export const useCreateGenreModal = (props: UseCreateGenreModalProps) => {
  const { reload, genreSetDatabaseId } = props;

  const [opened, handlers] = useDisclosure();
  const [parentId, setParentId] = useState<string | null>(null);
  const [createGenre] = useCreateGenreMutation();
  const [getGenre] = useGetGenreLazyQuery();

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

  const close = () => {
    form.reset();
    handlers.close();
  };

  const open = (newParentId?: string) => {
    setParentId(newParentId || null);
    if (newParentId) {
      getGenre({
        fetchPolicy: 'network-only',
        variables: {
          input: {
            databaseId: newParentId,
          },
        },
      }).then((res) => {
        form.setValues({
          name: '',
          description: '',
          ratio: 5,
          color: res.data?.getGenre?.color ?? 'gray',
        });
      });
    }
    handlers.open();
  };

  const onSubmit = form.onSubmit(async (values) => {
    await createGenre({
      variables: {
        input: {
          genreSetDatabaseId,
          parentGenreDatabaseId: parentId || undefined,
          ...values,
        },
      },
    });
    reload();
    close();
  });

  const newHandlers = {
    open,
    close,
  };

  return {
    genreFormModalProps: {
      opened,
      close,
      onSubmit,
      form,
    },
    handlers: newHandlers,
  };
};
