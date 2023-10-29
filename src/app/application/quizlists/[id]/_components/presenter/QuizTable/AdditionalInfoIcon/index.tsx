/* eslint-disable react/no-danger */
import {
  HoverCardProps, HoverCard, Tooltip,
} from '@mantine/core';
import { Icon as IconType } from '@tabler/icons-react';
import React from 'react';

interface AdditionalInfoIconProps extends HoverCardProps {
  Icon: IconType;
  data: string | null | undefined;
  tooltipLabel?: string;
}

export const AdditionalInfoIcon = (props: AdditionalInfoIconProps) => {
  const {
    Icon, data, tooltipLabel, ...rest
  } = props;

  if (data && data !== '<p></p>') {
    return (
      <HoverCard shadow="md" {...rest}>
        <HoverCard.Target>
          <Tooltip label={tooltipLabel}>
            <Icon size="1.5rem" stroke={1.4} />
          </Tooltip>
        </HoverCard.Target>
        <HoverCard.Dropdown p={0}>
          <div
            dangerouslySetInnerHTML={{ __html: data }}
            style={{ paddingLeft: '1rem', paddingRight: '1rem' }}
          />
        </HoverCard.Dropdown>
      </HoverCard>
    );
  }
  return (
    <Tooltip label={tooltipLabel}>
      <Icon size="1.5rem" stroke={1.4} />
    </Tooltip>
  );
};
