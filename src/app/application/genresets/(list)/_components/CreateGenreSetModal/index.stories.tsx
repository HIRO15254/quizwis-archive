import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { useGenreSetForm } from '../../_hooks/useGenreSetForm';

import { CreateGenreSetModal } from './index';

const meta = {
  title: 'GenreSet/CreateGenreSetModal',
  component: CreateGenreSetModal,
} satisfies Meta<typeof CreateGenreSetModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    opened: true,
    onSubmit: () => {},
    genreSetForm: null,
  },
  render: function Render({ ...args }) {
    const { genreSetForm } = useGenreSetForm();
    return (
      <CreateGenreSetModal
        {...args}
        genreSetForm={genreSetForm}
      />
    );
  },
};
