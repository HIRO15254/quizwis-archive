'use client';

import {
  Box, Button, Group, LoadingOverlay, TextInput, Tooltip,
} from '@mantine/core';
import { IconAlertCircle, IconAt } from '@tabler/icons-react';
import React from 'react';

import { useBasicUserSetting } from '../../_hooks/useBasicUserSetting';

/**
 * ユーザーの基本情報を設定するためのフォーム
 */
export const BasicUserSettingForm: React.FC = () => {
  const { form, formOnSubmit, loading } = useBasicUserSetting();

  // フォーム右に表示して入力値が一般公開されることを示すアイコン
  const publicTooltip = (
    <Tooltip label="一般に公開されます" position="top-end" withArrow>
      <IconAlertCircle size="1rem" style={{ display: 'block', opacity: 0.5 }} />
    </Tooltip>
  );

  return (
    <Box pos="relative">
      <LoadingOverlay visible={loading} />
      <form onSubmit={form.onSubmit(formOnSubmit)}>
        <TextInput
          withAsterisk
          label="ユーザーID"
          description="半角英数字とハイフン、アンダーバーのみ使用可能です"
          icon={<IconAt size="1.2rem" />}
          rightSection={publicTooltip}
          {...form.getInputProps('userId')}
          pb="md"
        />
        <TextInput
          withAsterisk
          label="ユーザーネーム"
          rightSection={publicTooltip}
          {...form.getInputProps('name')}
          pb="md"
        />
        <TextInput
          label="メールアドレス"
          {...form.getInputProps('email')}
          pb="md"
        />
        <Group position="right">
          <Button type="submit" color="blue">
            更新
          </Button>
        </Group>
      </form>
    </Box>
  );
};
