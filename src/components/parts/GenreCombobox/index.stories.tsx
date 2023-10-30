import { Meta, StoryObj } from '@storybook/react';

import { GenreCombobox } from './index';

const meta = {
  title: 'parts/GenreCombobox',
  component: GenreCombobox,
} satisfies Meta<typeof GenreCombobox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const GenreComboboxStory: Story = {
  name: 'Default',
  args: {
    genres: [
      {
        id: '1',
        name: 'ジャンル1',
        ratio: 1,
        color: 'red',
      },
      {
        id: '2',
        name: 'ジャンル2',
        ratio: 1,
        color: 'red',
      },
      {
        id: '3',
        name: 'ジャンル3',
        ratio: 1,
        color: 'red',
      },
    ],
  },
};
