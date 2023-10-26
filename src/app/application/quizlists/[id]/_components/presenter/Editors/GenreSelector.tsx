// "use client";

// 各種import
import {
  ComboboxItem,
  OptionsFilter,
  Select,
} from '@mantine/core';
import React from 'react';

interface GenreSelectorItem extends ComboboxItem {
  searchText: string;
}

export interface GenreSelectorProps {
  genres: GenreSelectorItem[];
}

/**
 * 説明
 */
export const GenreSelector: React.FC<GenreSelectorProps> = (props) => {
  const {
    genres,
    ...others
  } = props;

  const optionsFilter: OptionsFilter = ({ options, search }) => {
    const splitSearch = search.toLowerCase().trim().split(' ');
    return (options as GenreSelectorItem[]).filter((option) => {
      const words = option.searchText.toLowerCase().trim().split(' ');
      return splitSearch.every((searchWord) => words.some((word) => word.includes(searchWord)));
    });
  };

  return (
    <Select
      size="md"
      searchable
      allowDeselect
      data={genres}
      rightSectionWidth={1}
      rightSection={<span />}
      filter={optionsFilter}
      styles={{ input: { fontSize: '0.8rem' } }}
      {...others}
    />
  );
};
