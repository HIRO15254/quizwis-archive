/* eslint-disable react/no-danger */
import {
  HoverCardProps, useMantineTheme, HoverCard, Tooltip, useComputedColorScheme,
} from '@mantine/core';
import { Icon as IconType } from '@tabler/icons-react';
import React from 'react';

import { colors } from 'styles/colors';

interface AdditionalInfoIconProps extends HoverCardProps {
  Icon: IconType;
  data: string | null | undefined;
  tooltipLabel?: string;
}

export const AdditionalInfoIcon = (props: AdditionalInfoIconProps) => {
  const {
    Icon, data, tooltipLabel, ...rest
  } = props;

  const theme = useMantineTheme();
  const colorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  if (data && data !== '<p></p>') {
    return (
      <HoverCard shadow="md" {...rest}>
        <HoverCard.Target>
          <Tooltip label={tooltipLabel}>
            <Icon size="1.5rem" stroke={1.4} color={colors.active(theme, colorScheme)} />
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
      <Icon size="1.5rem" stroke={1.4} color={colors.disabled(theme, colorScheme)} />
    </Tooltip>
  );
};
