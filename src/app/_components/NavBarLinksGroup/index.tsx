'use client';

import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  UnstyledButton,
  Anchor,
} from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import React, { useState } from 'react';

import classes from './index.module.css';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.FC<any>;
  label: string;
  initiallyOpened?: boolean;
  link?: { label: string; link: string }[] | string;
}

export const NavBarLinksGroup = ({
  icon: Icon, label, initiallyOpened, link,
}: Props) => {
  const hasLinks = Array.isArray(link);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const items = (hasLinks ? link : []).map((oneLink) => (
    <Anchor
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
                size="1rem"
                stroke={1.5}
                style={{
                  transform: opened ? 'rotate: 90deg)' : 'none',
                }}
              />
            </Group>
          </UnstyledButton>
          <Collapse in={opened}>{items}</Collapse>
        </>
        )}
      {!hasLinks
        && (
        <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
          <Anchor href={link} unstyled>
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
        </UnstyledButton>
        )}
    </>
  );
};
