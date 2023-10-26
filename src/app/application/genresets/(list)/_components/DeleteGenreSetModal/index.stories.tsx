import { Meta, StoryObj } from '@storybook/react';

import { DeleteGenreSetModal } from './index';

const meta = {
  title: 'GenreSet/DeleteGenreSetModal',
  component: DeleteGenreSetModal,
} satisfies Meta<typeof DeleteGenreSetModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    opened: true,
    data: {
      id: '1',
      name: 'ジャンルセット名',
      description: 'ジャンルセットの説明',
    },
  },
};
