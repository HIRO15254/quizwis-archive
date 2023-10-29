import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  UnstyledButton,
  Anchor, rem,
} from '@mantine/core';
import { IconChevronLeft, TablerIconsProps } from '@tabler/icons-react';
import Link from 'next/link';
import React, { ReactNode, useState } from 'react';

import classes from './index.module.css';

interface Props {
  icon: (props: TablerIconsProps) => ReactNode;
  label: string;
  initiallyOpened?: boolean;
  link?: {
    label: string;
    link: string
  }[] | string;
}

export const LinksGroup: React.FC<Props> = (props) => {
  const {
    icon: Icon, label, initiallyOpened, link,
  } = props;
  const hasLinks = Array.isArray(link);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const items = (hasLinks ? link : []).map((oneLink) => (
    <Anchor
      component={Link}
      unstyled
      className={classes.link}
      href={oneLink.link}
      key={oneLink.label}
    >
      {oneLink.label}
    </Anchor>
  ));

  return (
    <>
      {hasLinks
        && (
        <>
          <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
            <Group justify="space-between" gap={0}>
              <Box style={{ display: 'flex', alignItems: 'center' }}>
                <ThemeIcon variant="light" size={30}>
                  <Icon size="1.1rem" />
                </ThemeIcon>
                <Box ml="md">{label}</Box>
              </Box>
              <IconChevronLeft
                className={classes.chevron}
                stroke={1.5}
                style={{
                  width: rem(16),
                  height: rem(16),
                  transform: opened ? 'rotate(-90deg)' : 'none',
                }}
              />
            </Group>
          </UnstyledButton>
          <Collapse in={opened}>{items}</Collapse>
        </>
        )}
      {!hasLinks
        && (
          <Anchor component={Link} href={link ?? '/'} className={classes.control}>
            <Group justify="space-between" gap={0}>
              <Box style={{ display: 'flex', alignItems: 'center' }}>
                <ThemeIcon variant="light" size={30}>
                  <Icon size="1.1rem" />
                </ThemeIcon>
                <Box ml="md">
                  {label}
                </Box>
              </Box>
            </Group>
          </Anchor>
        )}
    </>
  );
};
