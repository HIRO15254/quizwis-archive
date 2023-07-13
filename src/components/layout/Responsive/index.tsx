// "use client";

import { MediaQuery } from '@mantine/core';
import React from 'react';

import { MANTINE_SMARTPHONE_BREAKPOINT } from 'config/layoutConfig';

interface ResponsiveProps {
  children: React.ReactNode;
}

type ResponsiveType = {
  Desktop: React.FC<ResponsiveProps>;
  SmartPhone: React.FC<ResponsiveProps>;
};

/**
 * これらでコンポーネントを包むことで特定の画面サイズの時のみ表示されるようにする
 */
export const Responsive: ResponsiveType = {
  /**
   * 中身を非スマートフォンサイズの時のみ表示されるようにする
   */
  Desktop: (props) => {
    // eslint-disable-next-line react/prop-types
    const { children } = props;
    return (
      <MediaQuery smallerThan={MANTINE_SMARTPHONE_BREAKPOINT} styles={{ display: 'none' }}>
        {children}
      </MediaQuery>
    );
  },
  /**
   * 中身をスマートフォンサイズの時のみ表示されるようにする
   */
  SmartPhone: (props) => {
    // eslint-disable-next-line react/prop-types
    const { children } = props;
    return (
      <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
        {children}
      </MediaQuery>
    );
  },
};
