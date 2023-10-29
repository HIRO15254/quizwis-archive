import { Meta, StoryObj } from '@storybook/react';

import { DeleteQuizListModal } from './index';

const meta = {
  title: 'QuizList/DeleteQuizModal',
  component: DeleteQuizListModal,
} satisfies Meta<typeof DeleteQuizListModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    opened: true,
    data: {
      __typename: 'QuizList',
      id: '1',
      name: '問題セット1',
      description: '問題セット1の説明',
      quizCount: 100,
    },
  },
};
