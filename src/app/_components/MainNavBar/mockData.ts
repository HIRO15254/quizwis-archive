import {
  IconSquareRoundedLetterQ,
  IconHome,
} from '@tabler/icons-react';

export const mockData = [
  { label: 'トップページ', icon: IconHome, link: '/' },
  {
    label: '問題作成',
    icon: IconSquareRoundedLetterQ,
    initiallyOpened: true,
    link: [
      { label: '問題リスト一覧', link: '/create_quiz' },
    ],
  },
];
