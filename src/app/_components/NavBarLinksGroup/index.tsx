'use client';

import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  UnstyledButton,
  createStyles,
  rem,
  Anchor,
} from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import React, { useState } from 'react';

import { colors } from 'styles/colors';

const useStyles = createStyles((theme) => ({
  control: {
    fontWeight: 500,
    display: 'block',
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    color: colors.text(theme),
    fontSize: theme.fontSizes.sm,

    '&:hover': {
      backgroundColor: colors.backgroundHover(theme),
      color: colors.textHover(theme),
    },
  },

  link: {
    fontWeight: 500,
    display: 'block',
    textDecoration: 'none',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    paddingLeft: rem(31),
    marginLeft: rem(30),
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    borderLeft: `${rem(1)} solid ${colors.border(theme)}`,

    '&:hover': {
      backgroundColor: colors.backgroundHover(theme),
      color: colors.textHover(theme),
    },
  },

  chevron: {
    transition: 'transform 200ms ease',
  },
}));

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
  const { classes, theme } = useStyles();
  const hasLinks = Array.isArray(link);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const ChevronIcon = theme.dir === 'ltr' ? IconChevronRight : IconChevronLeft;
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
            <Group position="apart" spacing={0}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ThemeIcon variant="light" size={30}>
                  <Icon size="1.1rem" />
                </ThemeIcon>
                <Box ml="md">{label}</Box>
              </Box>
              <ChevronIcon
                className={classes.chevron}
                size="1rem"
                stroke={1.5}
                style={{
                  transform: opened ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)` : 'none',
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
            <Group position="apart" spacing={0}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
