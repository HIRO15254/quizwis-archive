import { isNotEmpty, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';

import { useUpdateGenreMutation, useGetGenreLazyQuery } from 'gql';

import { UpdateGenreFormType } from '../_components/presenter/UpdateGenreModal';

type UseUpdateGenreModalProps = {
  reload: () => void;
};

export const useUpdateGenreModal = (props: UseUpdateGenreModalProps) => {
  const { reload } = props;
  const [opened, handlers] = useDisclosure();
  const [updateGenre] = useUpdateGenreMutation();
  const [getGenre] = useGetGenreLazyQuery();
  const [databaseId, setDatabaseId] = useState<string>('');

  const form = useForm<UpdateGenreFormType>({
    initialValues: {
      name: '',
      description: '',
      ratio: 1,
    },
    validate: {
      name: isNotEmpty('このフィールドは必須です'),
    },
  });

  const onOpen = async (open_id: string) => {
    setDatabaseId(open_id);
    getGenre({
      variables: {
        input: {
          databaseId: open_id,
        },
      },
    }).then((res) => {
      form.setValues({
        name: res.data?.getGenre?.name ?? '',
        description: res.data?.getGenre?.description ?? '',
        ratio: res.data?.getGenre?.ratio ?? 1,
      });
    });
    handlers.open();
  };

  const onSubmit = form.onSubmit(async (values) => {
    await updateGenre({
      variables: {
        input: {
          databaseId,
          name: values.name,
          description: values.description,
        },
      },
    });
    reload();
    handlers.close();
  });

  const newHandlers = {
    open: onOpen,
    close: handlers.close,
  };

  return {
    opened, handlers: newHandlers, form, onSubmit,
  };
};
