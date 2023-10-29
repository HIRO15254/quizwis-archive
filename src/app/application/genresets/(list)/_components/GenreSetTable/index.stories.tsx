import { encodeGlobalID } from '@pothos/plugin-relay';
import { Meta, StoryObj } from '@storybook/react';

import { GenreSetTable } from './index';

const meta = {
  title: 'GenreSet/GenreSetTable',
  component: GenreSetTable,
} satisfies Meta<typeof GenreSetTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    loading: false,
    data: [
      {
        id: encodeGlobalID('GenreSet', '1'),
        name: 'ジャンルセット名',
        description: 'ジャンルセットの説明',
      },
      {
        id: encodeGlobalID('GenreSet', '2'),
        name: 'ジャンルセット名2',
      },
    ],
    operations: {
      create: () => {},
      delete: () => {},
      update: () => {},
    },
  },
};
