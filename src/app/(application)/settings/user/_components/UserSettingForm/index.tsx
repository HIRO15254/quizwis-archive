'use client';

import {
  Group, Paper, Tabs, Title,
} from '@mantine/core';
import React from 'react';

import { AvatarSettingForm } from '../AvatarSettingForm';
import { BasicUserSettingForm } from '../BasicUserSettingForm';

/**
 * 各種ユーザー設定フォームをまとめたタブ
 */
export const UserSettingForm: React.FC = () => (
  <Group position="center" pb="sm">
    <Paper w="100%" maw={800} p="xl" shadow="xs">
      <Title order={1}>
        ユーザー設定
      </Title>
      <Group position="center">
        <Tabs defaultValue="basic" w="100%" mt="md">
          <Tabs.List>
            <Tabs.Tab value="basic">基本設定</Tabs.Tab>
            <Tabs.Tab value="icon">アイコン設定</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="basic" pt="xs" px="sm">
            <BasicUserSettingForm />
          </Tabs.Panel>
          <Tabs.Panel value="icon" pt="xs" px="sm">
            <AvatarSettingForm />
          </Tabs.Panel>
        </Tabs>
      </Group>
    </Paper>
  </Group>
);
