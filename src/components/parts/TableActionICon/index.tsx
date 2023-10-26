'use client';

import { ActionIcon, ActionIconProps, Tooltip } from '@mantine/core';
import { TablerIconsProps } from '@tabler/icons-react';
import React from 'react';

// Propsの型定義
interface TableActionIconProps extends ActionIconProps {
  tooltip: string;
  onClick?: () => void;
  Icon: React.FC<TablerIconsProps>;
}

/**
 *
 */
export const TableActionIcon: React.FC<TableActionIconProps> = (props) => {
  const {
    tooltip,
    onClick,
    Icon,
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
        <Icon size="1.5rem" stroke={1.4} />
      </ActionIcon>
    </Tooltip>
  );
};
