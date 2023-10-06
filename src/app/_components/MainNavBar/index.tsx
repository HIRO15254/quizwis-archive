'use client';

import {
  AppShell, ScrollArea,
} from '@mantine/core';
import React from 'react';

import classes from './index.module.css';
import { mockData } from './mockData';
import { NavBarLinksGroup } from '../NavBarLinksGroup';

export const MainNavBar: React.FC = () => (
  <AppShell.Navbar p="md">
    <ScrollArea className={classes.links}>
      <div className={classes.linksInner}>
        {mockData.map((item) => (
          <NavBarLinksGroup {...item} key={item.label} />
        ))}
      </div>
    </ScrollArea>
  </AppShell.Navbar>
);
