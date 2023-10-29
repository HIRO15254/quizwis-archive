import {
  AppShell, ScrollArea,
} from '@mantine/core';
import React from 'react';

import { LinksGroup } from './LinksGroup';
import { linksGroupData } from './LinksGroup/linksGroupData';
import classes from './index.module.css';

export const Navbar: React.FC = () => (
  <AppShell.Navbar p="md">
    <ScrollArea className={classes.links}>
      {linksGroupData.map((item) => (
        <LinksGroup {...item} key={item.label} />
      ))}
    </ScrollArea>
  </AppShell.Navbar>
);
