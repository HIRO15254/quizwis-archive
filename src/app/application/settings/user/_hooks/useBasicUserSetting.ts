'use client';

import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { GetLoginUserQuery, useGetLoginUserQuery, useUpdateLoginUserMutation } from 'gql';
import { errorNotification, successNotification } from 'util/notifications';
import { userIdValidator, userNameValidator, emailValidator } from 'util/validators';

export type BasicUserSettingType = {
  userId: string
  name: string
  email: string
};

/**
 * ユーザー基本情報設定を行うためのカスタムフック
 */
export const useBasicUserSetting = () => {
  const router = useRouter();
  const { update: updateSession } = useSession();

  const form = useForm<BasicUserSettingType>({
    initialValues: {
      userId: '',
      name: '',
      email: '',
    },
    validate: {
      userId: userIdValidator,
      name: userNameValidator,
      email: emailValidator,
    },
  });

  const initializeForm = (data: GetLoginUserQuery) => {
    if (data?.loginUser) {
      form.setValues({
        userId: data?.loginUser.userId || '',
        name: data?.loginUser.name || '',
        email: data?.loginUser.email || '',
      });
    }
  };

  const { loading } = useGetLoginUserQuery({ onCompleted: initializeForm });
  const [updateUser] = useUpdateLoginUserMutation();

  const formOnSubmit = async (values: BasicUserSettingType) => {
    updateUser({
      variables: {
        input: {
          newUserId: values.userId,
          name: values.name,
          email: values.email,
        },
      },
    }).then(async () => {
      successNotification({
        title: '更新成功',
        message: 'ユーザー情報を更新しました',
      });
      await updateSession();
      router.refresh();
    }).catch(() => {
      errorNotification({
        title: '更新失敗',
        message: 'ユーザー情報の更新に失敗しました',
      });
    });
  };

  return { form, formOnSubmit, loading };
};
