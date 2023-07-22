import {
  IconSquareRoundedLetterQ,
  IconHome,
} from '@tabler/icons-react';

export const mockData = [
  { label: 'ダッシュボード', icon: IconHome, link: '/dashboard' },
  {
    label: '問題作成',
    icon: IconSquareRoundedLetterQ,
    initiallyOpened: true,
    link: [
      { label: '問題リスト一覧', link: '/create_quiz/quizlist/list' },
      { label: 'ジャンルセット一覧', link: '/create_quiz/genreset/list' },
    ],
  },
];
