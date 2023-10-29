import { Select, SelectProps } from '@mantine/core';
import React from 'react';

import { GenreDataFragment } from 'gql';

interface Props extends SelectProps {
  genres: GenreDataFragment[];
}

export const GenreFilterSelect = (props: Props) => {
  const {
    genres,
    ...rest
  } = props;

  const genresData = genres.map((genre) => ({
    value: genre.id,
    label: genre.name,
  }));

  return (
    <Select
      label="ジャンル"
      clearable
      style={{ width: 300 }}
      data={genresData}
      {...rest}
    />
  );
};
