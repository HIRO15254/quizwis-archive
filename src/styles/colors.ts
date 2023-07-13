import { MantineTheme } from '@mantine/core';

/**
 * Mantineの（特にテーマ依存の）色の定義
 */
export const colors = {
  // ページ上のPaperの背景色
  background(theme: MantineTheme) {
    return theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white;
  },
  // ページ上のPaperのホバー時背景色
  backgroundHover(theme: MantineTheme) {
    return theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0];
  },
  // ページ全体の背景色
  pageBackground(theme: MantineTheme) {
    return theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0];
  },
  // 通常テキストの色
  text(theme: MantineTheme) {
    return theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black;
  },
  // ホバー時テキストの色
  textHover(theme: MantineTheme) {
    return theme.colorScheme === 'dark' ? theme.white : theme.black;
  },
  // ボーダーの色
  border(theme: MantineTheme) {
    return theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3];
  },
};
