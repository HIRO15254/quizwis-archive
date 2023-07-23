'use client';

import { ActionIcon, ActionIconProps, Tooltip } from '@mantine/core';
import React from 'react';

// Propsの型定義
interface TableActionIconProps extends ActionIconProps {
  tooltip: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

/**
 *
 */
export const TableActionIcon: React.FC<TableActionIconProps> = (props) => {
  const {
    tooltip,
    onClick,
    children,
  } = props;

  return (
    <Tooltip label={tooltip}>
      <ActionIcon
        variant="subtle"
        size="lg"
        color="blue"
        onClick={onClick}
        {...props}
      >
        {children}
      </ActionIcon>
    </Tooltip>
  );
};
