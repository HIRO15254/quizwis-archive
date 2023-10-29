import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { useGenreSetForm } from '../../_hooks/useGenreSetForm';

import { UpdateGenreSetModal } from './index';

const meta = {
  title: 'GenreSet/UpdateGenreSetModal',
  component: UpdateGenreSetModal,
} satisfies Meta<typeof UpdateGenreSetModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    opened: true,
    genreSetForm: null,
  },
  render: function Render({ ...args }) {
    const { genreSetForm } = useGenreSetForm();
    return (
      <UpdateGenreSetModal
        {...args}
        genreSetForm={genreSetForm}
      />
    );
  },
};
