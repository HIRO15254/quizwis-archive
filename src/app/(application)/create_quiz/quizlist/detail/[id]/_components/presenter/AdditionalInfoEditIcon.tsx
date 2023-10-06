import {
  HoverCardProps, Popover, Tooltip, useComputedColorScheme, useMantineTheme,
} from '@mantine/core';
import { Icon as IconType } from '@tabler/icons-react';
import { Editor } from '@tiptap/react';
import React from 'react';

import { colors } from 'styles/colors';

interface AdditionalInfoEditIconProps extends HoverCardProps {
  Icon: IconType;
  label: string;
  editor: Editor;
  children: React.ReactNode;
}

export const AdditionalInfoEditIcon = (props: AdditionalInfoEditIconProps) => {
  const {
    Icon, children, label, editor, ...rest
  } = props;

  const theme = useMantineTheme();
  const colorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return (
    <Popover shadow="md" width={400} {...rest} trapFocus>
      <Popover.Target>
        <Tooltip label={label}>
          <Icon
            size="1.5rem"
            stroke={1.4}
            color={
              editor.getText()
                ? colors.active(theme, colorScheme)
                : colors.disabled(theme, colorScheme)
            }
          />
        </Tooltip>
      </Popover.Target>
      <Popover.Dropdown p={0}>
        {children}
      </Popover.Dropdown>
    </Popover>
  );
};
