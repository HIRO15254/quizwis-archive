import { isNotEmpty, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';

import { useCreateQuizListMutation } from 'gql';

import type { CreateQuizListFormType } from '../../_components/presenter/CreateQuizListModal';

type UseCreateQuizListModalProps = {
  reload: () => void;
};

export const useCreateQuizListModal = (props: UseCreateQuizListModalProps) => {
  const { reload } = props;
  const [opened, handlers] = useDisclosure();
  const [createQuizList] = useCreateQuizListMutation();

  const form = useForm<CreateQuizListFormType>({
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
    await createQuizList({
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
