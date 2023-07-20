import { isNotEmpty, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';

import { useUpdateQuizListMutation, useGetQuizListLazyQuery } from 'gql';

import { UpdateQuizListFormType } from '../_components/presenter/UpdateQuizListModal';

type UseUpdateQuizListModalProps = {
  reload: () => void;
};

export const useUpdateQuizListModal = (props: UseUpdateQuizListModalProps) => {
  const { reload } = props;
  const [opened, handlers] = useDisclosure();
  const [updateQuizList] = useUpdateQuizListMutation();
  const [getQuizList] = useGetQuizListLazyQuery();
  const [databaseId, setDatabaseId] = useState<string>('');

  const form = useForm<UpdateQuizListFormType>({
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
    getQuizList({
      variables: {
        input: {
          databaseId: open_id,
        },
      },
    }).then((res) => {
      form.setValues({
        name: res.data?.getQuizList?.name ?? '',
        description: res.data?.getQuizList?.description ?? '',
      });
    });
    handlers.open();
  };

  const onSubmit = form.onSubmit(async (values) => {
    await updateQuizList({
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
