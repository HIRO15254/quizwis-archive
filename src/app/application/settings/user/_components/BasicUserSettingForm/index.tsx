'use client';

import {
  Button, Group, LoadingOverlay, Stack, TextInput, Tooltip,
} from '@mantine/core';
import { IconAlertCircle, IconAt } from '@tabler/icons-react';
import React from 'react';

import { useBasicUserSetting } from '../../_hooks/useBasicUserSetting';

/**
 * ユーザーの基本情報を設定するためのフォーム
 */
export const BasicUserSettingForm: React.FC = () => {
  const {
    form,
    formOnSubmit,
    loading,
  } = useBasicUserSetting();

  // フォーム右に表示して入力値が一般公開されることを示すアイコン
  const publicTooltip = (
    <Tooltip label="一般に公開されます" position="top-end" withArrow>
      <IconAlertCircle size="1rem" style={{ display: 'block' }} />
    </Tooltip>
  );

  return (
    <form onSubmit={form.onSubmit(formOnSubmit)}>
      <Stack>
        <LoadingOverlay visible={loading} />
        <TextInput
          withAsterisk
          label="ユーザーID"
          description="半角英数字とハイフン、アンダーバーのみ使用可能です"
          leftSection={<IconAt size="1.2rem" />}
          rightSection={publicTooltip}
          {...form.getInputProps('userId')}
        />
        <TextInput
          withAsterisk
          label="ユーザーネーム"
          rightSection={publicTooltip}
          {...form.getInputProps('name')}
        />
        <TextInput
          label="メールアドレス"
          {...form.getInputProps('email')}
        />
        <Group justify="flex-end">
          <Button type="submit" color="blue">
            更新
          </Button>
        </Group>
      </Stack>
    </form>
  );
};
