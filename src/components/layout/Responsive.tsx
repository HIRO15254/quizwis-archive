// "use client";
import React from 'react';

import classes from './Responsive.module.css';

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
      <div className={classes.desktop}>
        {children}
      </div>
    );
  },
  /**
   * 中身をスマートフォンサイズの時のみ表示されるようにする
   */
  SmartPhone: (props) => {
    // eslint-disable-next-line react/prop-types
    const { children } = props;
    return (
      <div className={classes.smartphone}>
        {children}
      </div>
    );
  },
};
