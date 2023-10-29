import { Meta, StoryObj } from '@storybook/react';

import GoogleIcon from './index';

const meta = {
  title: 'Auth/GoogleIcon',
  component: GoogleIcon,
} satisfies Meta<typeof GoogleIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
