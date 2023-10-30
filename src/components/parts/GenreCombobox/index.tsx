import {
  Combobox, Input, InputBase, InputBaseProps, InputProps, rem, Text, TextInput, useCombobox,
} from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import React from 'react';

import { GenreDataFragment } from 'gql';

import { GenreBadge } from '../GenreBadge';

interface Props extends InputBaseProps {
  genres: GenreDataFragment[];
}

export const GenreCombobox: React.FC<Props> = (props) => {
  const {
    genres,
    ...other
  } = props;

  const [value, setValue] = React.useState('');
  const [search, setSearch] = React.useState('');

  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption();
      setSearch('');
    },
    onDropdownOpen: () => {
      combobox.focusSearchInput();
    },
  });

  const options = genres
    .filter((genre) => genre.name.includes(search))
    .map((genre) => (
      <Combobox.Option
        key={genre.id}
        value={genre.id}
      >
        <GenreBadge genre={genre} />
      </Combobox.Option>
    ));

  const selectedGenre = genres.find((genre) => genre.id === value);

  return (
    <Combobox
      onOptionSubmit={(option) => {
        setValue(option);
        combobox.closeDropdown();
      }}
      store={combobox}
    >
      <Combobox.Target>
        <InputBase
          component="button"
          pointer
          rightSection={<Combobox.Chevron />}
          onClick={() => combobox.toggleDropdown()}
          {...other}
        >
          {selectedGenre !== undefined
            ? <GenreBadge genre={selectedGenre} />
            : 'ジャンルなし'}
        </InputBase>
      </Combobox.Target>
      <Combobox.Dropdown>
        <Combobox.Search
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
          placeholder="Search..."
        />
        <Combobox.Options>
          {options.length > 0
            ? options
            : <Combobox.Empty>Nothing found</Combobox.Empty>}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};
