import { isNotEmpty, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';

import { useUpdateGenreSetMutation, useGetGenreSetLazyQuery } from 'gql';

import { UpdateGenreSetFormType } from '../_components/presenter/UpdateGenreSetModal';

type UseUpdateGenreSetModalProps = {
  reload: () => void;
};

export const useUpdateGenreSetModal = (props: UseUpdateGenreSetModalProps) => {
  const { reload } = props;
  const [opened, handlers] = useDisclosure();
  const [updateGenreSet] = useUpdateGenreSetMutation();
  const [getGenreSet] = useGetGenreSetLazyQuery();
  const [databaseId, setDatabaseId] = useState<string>('');

  const form = useForm<UpdateGenreSetFormType>({
    initialValues: {
      name: '',
      description: '',
    },
    validate: {
      name: isNotEmpty('このフィールドは必須です'),
    },
  });

  const onOpen = async (open_id: string) => {
    setDatabaseId(open_id);
    getGenreSet({
      variables: {
        input: {
          databaseId: open_id,
        },
      },
    }).then((res) => {
      form.setValues({
        name: res.data?.getGenreSet?.name ?? '',
        description: res.data?.getGenreSet?.description ?? '',
      });
    });
    handlers.open();
  };

  const onSubmit = form.onSubmit(async (values) => {
    await updateGenreSet({
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
