import { encodeGlobalID } from '@pothos/plugin-relay';
import { Meta, StoryObj } from '@storybook/react';

import { QuizListTable } from './index';

const meta = {
  title: 'QuizList/QuizListTable',
  component: QuizListTable,
} satisfies Meta<typeof QuizListTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    loading: false,
    operation: {
      create: () => {},
      delete: () => {},
      update: () => {},
    },
    data: [
      {
        __typename: 'QuizList',
        id: encodeGlobalID('QuizList', '1'),
        name: 'テスト問題リスト',
        quizCount: 2,
      },
      {
        __typename: 'QuizList',
        id: encodeGlobalID('QuizList', '2'),
        name: 'テスト問題リスト2',
        description: 'テスト問題リストの説明',
        quizCount: 20,
        goal: 100,
      },
    ],
  },
};

export const Empty: Story = {
  args: {
    ...Default.args,
    data: [],
  },
};
