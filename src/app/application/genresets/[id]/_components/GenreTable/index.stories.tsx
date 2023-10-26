import { Meta, StoryObj } from '@storybook/react';

import { GenreTable } from './index';

const meta = {
  title: 'Genre/GenreTable',
  component: GenreTable,
} satisfies Meta<typeof GenreTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    loading: false,
    data: [
      {
        data: {
          id: '1',
          name: 'ジャンル名',
          description: 'ジャンルの説明',
          ratio: 5,
          color: 'gray',
          ratioPercent: 5,
          allRatioPercent: 5,
          childGenres: [],
        },
        children: [],
      },
    ],
    operations: {
      create: () => {},
      update: () => {},
      delete: () => {},
    },
  },
};

export const Empty: Story = {
  args: {
    loading: false,
    data: [],
    operations: {
      create: () => {},
      update: () => {},
      delete: () => {},
    },
  },
};
