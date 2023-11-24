import { Badge, BadgeProps, Tooltip } from '@mantine/core';
import React from 'react';

import { GenreDataFragment } from 'gql';

interface Props extends BadgeProps {
  genre: GenreDataFragment;
  noTooltip?: boolean;
}

/**
 * ジャンルを示すためのバッジ
 */
export const GenreBadge: React.FC<Props> = (props) => {
  const {
    genre,
    noTooltip,
    ...others
  } = props;

  if (genre.name.length > 10) {
    if (noTooltip) {
      return (
        <Badge variant="light" size="lg" color={genre.color} {...others}>
          {`${genre.name.slice(0, 9)}...`}
        </Badge>
      );
    }
    return (
      <Tooltip label={genre.name}>
        <Badge variant="light" size="lg" color={genre.color} {...others}>
          {`${genre.name.slice(0, 9)}...`}
        </Badge>
      </Tooltip>
    );
  }
  return (
    <Badge variant="light" size="lg" color={genre.color} {...others}>
      {genre.name}
    </Badge>
  );
};
