// "use client";

// 各種import
import {
  Badge, Group, Select,
} from '@mantine/core';
import React, { forwardRef } from 'react';

export interface GenreSelectorProps {
  genres: {
    value: string;
    label: string;
    searchText: string;
    color?: string | null | undefined;
  }[];
}

interface ItemBadgeProps {
  label: string;
  color?: string | null | undefined;
  value: string;
}

const ItemBadge = forwardRef<HTMLDivElement, ItemBadgeProps>((props, ref) => {
  const {
    label,
    color,
    value,
    ...others
  } = props;

  return (
    <div ref={ref} style={{ padding: '0.25rem' }} {...others}>
      <Group w="min-content">
        <Badge key={value} color={color ?? 'gray'} size="lg" fullWidth>{label}</Badge>
      </Group>
    </div>
  );
});

/**
 * 説明
 */
export const GenreSelector: React.FC<GenreSelectorProps> = (props) => {
  const {
    genres,
    ...others
  } = props;

  return (
    <Select
      size="md"
      searchable
      allowDeselect
      itemComponent={ItemBadge}
      data={genres}
      rightSectionWidth={1}
      rightSection={<span />}
      filter={(query, item) => {
        const ret = item.searchText?.toLowerCase().includes(query.toLowerCase()) ?? false;
        return ret;
      }}
      styles={{ input: { fontSize: '0.8rem' } }}
      {...others}
    />
  );
};
