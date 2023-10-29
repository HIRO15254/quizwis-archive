import { Container, Title } from '@mantine/core';
import React from 'react';

import { UserSettingForm } from '../../_components/UserSettingForm';

export const UserSettingContainer: React.FC = () => (
  <Container size="sm">
    <Title order={1}>
      ユーザー設定
    </Title>
    <UserSettingForm />
  </Container>
);
