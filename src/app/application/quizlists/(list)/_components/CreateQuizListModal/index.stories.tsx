import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { GetGenreSetsDocument } from 'gql';

import { useQuizListForm } from '../../_hooks/useQuizListForm';

import { CreateQuizListModal } from './index';

const meta = {
  title: 'QuizList/CreateQuizListModal',
  component: CreateQuizListModal,
} satisfies Meta<typeof CreateQuizListModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    opened: true,
    quizListForm: null,
  },
  render: function Render(args) {
    const { quizListForm } = useQuizListForm();
    return (
      <CreateQuizListModal
        {...args}
        quizListForm={quizListForm}
      />
    );
  },
  parameters: {
    apolloClient: {
      mocks: [
        {
          request: {
            query: GetGenreSetsDocument,
          },
          result: {
            data: {
              getGenreSets: [
                {
                  __typename: 'GenreSet',
                  id: '1',
                  name: 'ジャンルセット1',
                  description: 'ジャンルセット1の説明',
                },
                {
                  __typename: 'GenreSet',
                  id: '2',
                  name: 'ジャンルセット2',
                  description: 'ジャンルセット2の説明',
                },
              ],
            },
          },
        },
      ],
    },
  },
};
