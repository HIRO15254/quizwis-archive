'use client';

import { Avatar, AvatarProps } from '@mantine/core';
import React from 'react';

interface UserAvatarProps extends AvatarProps {
  user?: {
    name: string;
    image: string;
  };
}

/**
 * ユーザーアイコン
 * @param MantineのAvatarPropsを継承(radiusの指定は不可, userにユーザー情報可)
 */
export const UserAvatar: React.FC<UserAvatarProps> = (props) => {
  const {
    user,
    src,
  } = props;

  // 実際のコンポーネント
  return (
    <Avatar
      {...props}
      src={user?.image ?? src}
      alt={user?.name ?? 'user avatar'}
      radius="xl"
    />
  );
};
