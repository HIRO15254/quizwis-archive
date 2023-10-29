import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { useGenreForm } from '../../_hooks/useGenreForm';

import { UpdateGenreModal } from './index';

const meta = {
  title: 'Genre/UpdateGenreModal',
  component: UpdateGenreModal,
} satisfies Meta<typeof UpdateGenreModal>;

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
      <UpdateGenreModal
        {...args}
        genreForm={genreForm}
      />
    );
  },
};
