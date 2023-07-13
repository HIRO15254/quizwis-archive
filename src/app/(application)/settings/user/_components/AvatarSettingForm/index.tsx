'use client';

import {
  Group, FileInput, Input,
} from '@mantine/core';
import { IconUpload } from '@tabler/icons-react';
import React from 'react';

import { UserAvatar } from 'components/common/UserAvatar';
import { USER_ICON_SIZE } from 'config/userConfig';

import { useAvatarSetting } from '../../_hooks/useAvatarSetting';
import AvatarEditModal from '../AvatarEditModal';

/**
 * ユーザーアイコンを設定するためのフォーム
 */
export const AvatarSettingForm: React.FC = () => {
  const {
    opened: openedModal,
    image,
    imageUrl,
    onImageChange,
    onCloseModal,
    onImageSave,
  } = useAvatarSetting();

  return (
    <Input.Wrapper
      label="アイコン"
      description={`アップロードしたアイコンは${USER_ICON_SIZE}px四方にリサイズされます。`}
    >
      <AvatarEditModal
        opened={openedModal}
        close={onCloseModal}
        image={image}
        onImageSave={onImageSave}
      />
      <Group pt="sm">
        <UserAvatar src={imageUrl} size="lg" />
        <FileInput
          placeholder="ファイルを選択…"
          accept="image/*"
          icon={<IconUpload />}
          onChange={onImageChange}
          value={image}
        />
      </Group>
    </Input.Wrapper>
  );
};
