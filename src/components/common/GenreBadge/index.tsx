// "use client";

// 各種import
import { Badge, BadgeProps, Tooltip } from '@mantine/core';
import React from 'react';

// Propsの型定義
interface GenreBadgeProps extends BadgeProps {
  children: string;
  noTooltip?: boolean;
}

/**
 * 説明
 */
export const GenreBadge: React.FC<GenreBadgeProps> = (props) => {
  const {
    children,
    noTooltip,
    ...others
  } = props;

  if (children.length > 10) {
    if (noTooltip) {
      return (
        <Badge variant="light" size="lg" color="gray" {...others}>
          {`${children.slice(0, 9)}...`}
        </Badge>
      );
    }
    return (
      <Tooltip label={children}>
        <Badge variant="light" size="lg" color="gray" {...others}>
          {`${children.slice(0, 9)}...`}
        </Badge>
      </Tooltip>
    );
  }
  return (
    <Badge variant="light" size="lg" {...others}>
      {children}
    </Badge>
  );
};
