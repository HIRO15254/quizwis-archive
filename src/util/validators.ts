import { isEmail } from '@mantine/form';

import { USER_ID_MAX_LENGTH, USER_ID_MIN_LENGTH, USER_NAME_MAX_LENGTH } from 'config/userConfig';

export const emailValidator = (value: string) => {
  if (value && !isEmail(value)) {
    return 'メールアドレスの形式が正しくありません';
  }
  return null;
};

export const userNameValidator = (value: string) => {
  if (!value) {
    return 'ユーザー名を入力してください。';
  }
  if (value.length > USER_NAME_MAX_LENGTH) {
    return `${USER_NAME_MAX_LENGTH}文字以下で入力してください`;
  }
  return null;
};

export const userIdValidator = (value: string) => {
  if (!value) {
    return 'ユーザーIDを入力してください。';
  }
  if (value.length < USER_ID_MIN_LENGTH || value.length > USER_ID_MAX_LENGTH) {
    return `${USER_ID_MIN_LENGTH}文字以上${USER_ID_MAX_LENGTH}文字以下で入力してください`;
  }
  if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
    return '使用できない文字が含まれています';
  }
  return null;
};
