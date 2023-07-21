import { isNotEmpty, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';

import { useCreateQuizListMutation, useGetGenreSetsForQuizListLazyQuery } from 'gql';

import type { CreateQuizListFormType } from '../_components/presenter/CreateQuizListModal';

type UseCreateQuizListModalProps = {
  reload: () => void;
};

export const useCreateQuizListModal = (props: UseCreateQuizListModalProps) => {
  const { reload } = props;
  const [opened, handlers] = useDisclosure();
  const [createQuizList] = useCreateQuizListMutation();
  const [getGenreSets, { data }] = useGetGenreSetsForQuizListLazyQuery({
    fetchPolicy: 'network-only',
  });

  const form = useForm<CreateQuizListFormType>({
    initialValues: {
      name: '',
      description: '',
      genreSetId: '',
    },
    validate: {
      name: isNotEmpty('このフィールドは必須です'),
    },
  });

  const onClose = () => {
    form.reset();
    handlers.close();
  };

  const onOpen = () => {
    getGenreSets();
    handlers.open();
  };

  const genreSets = () => {
    if (!data?.getGenreSets) {
      return [{ value: '', label: 'なし' }];
    }
    const dataArray = data.getGenreSets.map((genreSet) => ({
      value: genreSet.databaseId,
      label: genreSet.name,
    }));
    const ret = [{ value: '', label: 'なし' }].concat(dataArray);
    return ret;
  };

  const onSubmit = form.onSubmit(async (values) => {
    await createQuizList({
      variables: {
        input: {
          name: values.name,
          description: values.description,
          genreSetId: values.genreSetId,
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
    opened, handlers: newHandlers, form, onSubmit, genreSets,
  };
};
