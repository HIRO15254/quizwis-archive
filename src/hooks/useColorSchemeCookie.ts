import { ColorScheme } from '@mantine/core';
import { cookies } from 'next/headers';

/**
 * カラースキームをCookieに保存・Cookieから取得するカスタムフック
 */
const useColorSchemeCookie = () => {
  let tempColorScheme = cookies().get('mantine-color-scheme')?.value || '';
  if (tempColorScheme !== 'dark' && tempColorScheme !== 'light') {
    tempColorScheme = 'light';
  }
  const colorScheme = tempColorScheme as ColorScheme;

  const setColorScheme = async (value: ColorScheme) => {
    'use server';

    cookies().set('mantine-color-scheme', value, { maxAge: 60 * 60 * 24 * 365 });
  };
  return { colorScheme, setColorScheme };
};

export default useColorSchemeCookie;
