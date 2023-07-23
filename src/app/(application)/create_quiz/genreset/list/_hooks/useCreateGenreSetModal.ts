import { isNotEmpty, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';

import { useCreateGenreSetMutation } from 'gql';
import { errorNotification, successNotification } from 'util/notifications';

import type { GenreSetFormType } from '../_types/GenreSetFormType';

type UseCreateGenreSetModalProps = {
  reload: () => void;
};

export const useCreateGenreSetModal = (props: UseCreateGenreSetModalProps) => {
  const { reload } = props;
  const [opened, handlers] = useDisclosure();
  const [createGenreSet] = useCreateGenreSetMutation();

  const form = useForm<GenreSetFormType>({
    initialValues: {
      name: '',
      description: '',
    },
    validate: {
      name: isNotEmpty('このフィールドは必須です'),
    },
  });

  const close = () => {
    form.reset();
    handlers.close();
  };

  const onSubmit = form.onSubmit(async (values) => {
    close();
    await createGenreSet({
      variables: {
        input: {
          name: values.name,
          description: values.description,
        },
      },
      onCompleted: () => {
        successNotification({ message: 'ジャンルセットを作成しました' });
        reload();
      },
      onError: () => {
        errorNotification({ message: 'ジャンルセットの作成に失敗しました' });
      },
    });
  });

  const newHandlers = {
    ...handlers,
    close,
  };

  return {
    modalProps: {
      opened,
      close,
      onSubmit,
      form,
    },
    handlers: newHandlers,
  };
};
