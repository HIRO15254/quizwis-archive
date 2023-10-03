import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';

import { useDeleteQuizListMutation, useGetQuizListLazyQuery } from 'gql';
import { errorNotification, successNotification } from 'util/notifications';

import { DeleteQuizListModal } from '../_components/presenter/DeleteQuizListModal';

export const useDeleteQuizListModal = () => {
  const [opened, handlers] = useDisclosure();
  const [
    deleteQuizList,
    { loading: mutationLoading },
  ] = useDeleteQuizListMutation();
  const [
    getQuizList,
    {
      data: quizListData,
      loading: getQuizListLoading,
    },
  ] = useGetQuizListLazyQuery({ fetchPolicy: 'cache-and-network' });

  const [id, setId] = useState<string>('');

  const open = async (openId: string) => {
    handlers.open();
    setId(openId);
    await getQuizList({
      variables: {
        input: {
          id: openId,
        },
      },
    });
  };

  const newHandlers = {
    ...handlers,
    open,
  };

  const onDelete = async () => {
    await deleteQuizList({
      variables: {
        input: {
          id,
        },
      },
      onCompleted: () => {
        successNotification({ message: '問題リストを削除しました' });
        newHandlers.close();
      },
      onError: () => {
        errorNotification({ message: '問題リストの削除に失敗しました' });
      },
      refetchQueries: ['GetQuizLists'],
    });
  };

  const modalProps = {
    opened,
    data: quizListData?.getQuizList,
    onClose: handlers.close,
    onConfirm: onDelete,
    loading: getQuizListLoading,
    buttonLoading: mutationLoading,
  };

  return {
    deleteQuizListModal: <DeleteQuizListModal {...modalProps} />,
    deleteQuizList: open,
  };
};
