import {
  IconSquareRoundedLetterQ,
  IconHome,
} from '@tabler/icons-react';

export const linksGroupData = [
  { label: 'ダッシュボード', icon: IconHome, link: '/application' },
  {
    label: '問題作成',
    icon: IconSquareRoundedLetterQ,
    initiallyOpened: true,
    link: [
      { label: '問題リスト一覧', link: '/application/quizlists' },
      { label: 'ジャンルセット一覧', link: '/application/genresets' },
    ],
  },
];
