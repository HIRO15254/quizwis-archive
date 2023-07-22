// "use client";

// 各種import
import {
  Badge, Select,
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
    <div ref={ref} {...others}>
      <Badge key={value} color={color ?? 'gray'} size="lg">{label}</Badge>
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
      clearable
      itemComponent={ItemBadge}
      data={genres}
      filter={(query, item) => {
        console.log(query, item);
        const ret = item.searchText?.toLowerCase().includes(query.toLowerCase()) ?? false;
        return ret;
      }}
      {...others}
    />
  );
};
