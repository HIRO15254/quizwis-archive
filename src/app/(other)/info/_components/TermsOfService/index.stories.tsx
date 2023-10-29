import { Meta, StoryObj } from '@storybook/react';

import { TermsOfService } from './index';

const meta = {
  title: 'Info/TeamsOfService',
  component: TermsOfService,
} satisfies Meta<typeof TermsOfService>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
