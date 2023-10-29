'use client';

import { Avatar, AvatarProps, Loader } from '@mantine/core';
import React from 'react';

interface UserAvatarProps extends AvatarProps {
  user?: {
    name: string;
    image: string;
  };
}

/**
 * ユーザーアイコン
 */
export const UserAvatar: React.FC<UserAvatarProps> = (props) => {
  const {
    user,
    src,
    ...other
  } = props;

  if (!user) {
    return (
      <Loader
        color="blue"
        size={other.size}
      />
    );
  }

  // 実際のコンポーネント
  return (
    <Avatar
      {...other}
      src={user?.image ?? src}
      alt={user?.name ?? 'user avatar'}
      radius="xl"
    />
  );
};
