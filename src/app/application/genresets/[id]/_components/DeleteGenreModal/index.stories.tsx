import { Meta, StoryObj } from '@storybook/react';

import { DeleteGenreModal } from './index';

const meta = {
  title: 'Genre/DeleteGenreModal',
  component: DeleteGenreModal,
} satisfies Meta<typeof DeleteGenreModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    opened: true,
    buttonLoading: false,
    data: {
      id: '1',
      name: 'ジャンル名',
      description: 'ジャンルの説明',
      ratio: 5,
      color: 'gray',
    },
  },
};
