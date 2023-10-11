import {
  HoverCardProps, Popover, Tooltip,
} from '@mantine/core';
import { Icon as IconType } from '@tabler/icons-react';
import React from 'react';

interface AdditionalInfoEditIconProps extends HoverCardProps {
  Icon: IconType;
  label: string;
  children: React.ReactNode;
}

export const AdditionalInfoEditIcon = (props: AdditionalInfoEditIconProps) => {
  const {
    Icon, children, label, ...rest
  } = props;

  return (
    <Popover shadow="md" width={400} {...rest} trapFocus>
      <Popover.Target>
        <Tooltip label={label}>
          <Icon
            size="1.5rem"
            stroke={1.4}
          />
        </Tooltip>
      </Popover.Target>
      <Popover.Dropdown p={0}>
        {children}
      </Popover.Dropdown>
    </Popover>
  );
};
