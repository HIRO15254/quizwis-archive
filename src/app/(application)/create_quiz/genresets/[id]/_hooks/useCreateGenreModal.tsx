import { isNotEmpty, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';

import { useCreateGenreMutation } from 'gql';

import type { CreateGenreFormType } from '../_components/presenter/CreateGenreModal';

type UseCreateGenreModalProps = {
  reload: () => void;
  genreSetDatabaseId: string;
};

export const useCreateGenreModal = (props: UseCreateGenreModalProps) => {
  const { reload, genreSetDatabaseId } = props;
  const [opened, handlers] = useDisclosure();
  const [parentId, setParentId] = useState<string | null>(null);
  const [createGenre] = useCreateGenreMutation();

  const form = useForm<CreateGenreFormType>({
    initialValues: {
      name: '',
      description: '',
      ratio: 1,
    },
    validate: {
      name: isNotEmpty('このフィールドは必須です'),
    },
  });

  const onClose = () => {
    form.reset();
    handlers.close();
  };

  const onOpen = (newParentId?: string) => {
    handlers.open();
    setParentId(newParentId || null);
  };

  const onSubmit = form.onSubmit(async (values) => {
    await createGenre({
      variables: {
        input: {
          genreSetDatabaseId,
          parentGenreDatabaseId: parentId || undefined,
          name: values.name,
          description: values.description,
          ratio: values.ratio,
        },
      },
    });
    reload();
    onClose();
  });

  const newHandlers = {
    open: onOpen,
    close: onClose,
  };

  return {
    opened, handlers: newHandlers, form, onSubmit,
  };
};
