import { isNotEmpty, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';

import { useCreateGenreSetMutation } from 'gql';

import type { CreateGenreSetFormType } from '../_components/presenter/CreateGenreSetModal';

type UseCreateGenreSetModalProps = {
  reload: () => void;
};

export const useCreateGenreSetModal = (props: UseCreateGenreSetModalProps) => {
  const { reload } = props;
  const [opened, handlers] = useDisclosure();
  const [createGenreSet] = useCreateGenreSetMutation();

  const form = useForm<CreateGenreSetFormType>({
    initialValues: {
      name: '',
      description: '',
    },
    validate: {
      name: isNotEmpty('このフィールドは必須です'),
    },
  });

  const onClose = () => {
    form.reset();
    handlers.close();
  };

  const onSubmit = form.onSubmit(async (values) => {
    await createGenreSet({
      variables: {
        input: {
          name: values.name,
          description: values.description,
        },
      },
    });
    reload();
    onClose();
  });

  const newHandlers = {
    open: handlers.open,
    close: onClose,
  };

  return {
    opened, handlers: newHandlers, form, onSubmit,
  };
};
