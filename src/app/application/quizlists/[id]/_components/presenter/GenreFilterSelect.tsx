import { Select } from '@mantine/core';
import React from 'react';

import { GenreDataFragment } from 'gql';

type Props = {
  genres: GenreDataFragment[];
  value: string | null;
  onChange: (newGenre: string | null) => void;
};

export const GenreFilterSelect = (props: Props) => {
  const {
    genres,
    value,
    onChange,
  } = props;

  const genresData = genres.map((genre) => ({
    value: genre.id,
    label: genre.name,
  }));

  return (
    <Select
      onChange={onChange}
      clearable
      value={value}
      style={{ width: 300 }}
      data={genresData}
    />
  );
};
