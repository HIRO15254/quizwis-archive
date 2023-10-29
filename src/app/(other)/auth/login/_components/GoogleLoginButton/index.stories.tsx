import { Meta, StoryObj } from '@storybook/react';

import GoogleLoginButton from './index';

const meta = {
  title: 'Auth/GoogleLoginButton',
  component: GoogleLoginButton,
} satisfies Meta<typeof GoogleLoginButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Googleでログイン',
  },
};
