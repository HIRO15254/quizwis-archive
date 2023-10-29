import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { useGenreForm } from '../../_hooks/useGenreForm';

import { CreateGenreModal } from './index';

const meta = {
  title: 'Genre/CreateGenreModal',
  component: CreateGenreModal,
} satisfies Meta<typeof CreateGenreModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    opened: true,
    genreForm: null,
  },
  render: function Render({ ...args }) {
    const { genreForm } = useGenreForm();
    return (
      <CreateGenreModal
        {...args}
        genreForm={genreForm}
      />
    );
  },
};
