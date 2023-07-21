import { isNotEmpty, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';

import { useUpdateQuizListMutation, useGetQuizListLazyQuery, useGetGenreSetsForQuizListLazyQuery } from 'gql';

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
  const [getGenreSets, { data }] = useGetGenreSetsForQuizListLazyQuery({
    fetchPolicy: 'network-only',
  });

  const form = useForm<UpdateQuizListFormType>({
    initialValues: {
      name: '',
      description: '',
      genreSetId: '',
    },
    validate: {
      name: isNotEmpty('このフィールドは必須です'),
    },
  });

  const onOpen = async (open_id: string) => {
    setDatabaseId(open_id);
    await getGenreSets();
    await getQuizList({
      variables: {
        input: {
          databaseId: open_id,
        },
      },
    }).then((res) => {
      form.setValues({
        name: res.data?.getQuizList?.name ?? '',
        description: res.data?.getQuizList?.description ?? '',
        genreSetId: res.data?.getQuizList?.genreSet?.databaseId ?? '',
      });
    });
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
    await updateQuizList({
      variables: {
        input: {
          databaseId,
          name: values.name,
          description: values.description,
          genreSetId: values.genreSetId ?? undefined,
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
    opened, handlers: newHandlers, form, onSubmit, genreSets,
  };
};
