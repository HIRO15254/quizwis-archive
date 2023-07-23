import React from 'react';

import { QuizTableContainer } from './_components/container/QuizTableContainer';

export const metadata = {
  title: '問題リスト詳細 - QuizWis',
};

const QuizListPage = async ({ params }: { params: { id: string } }) => (
  <QuizTableContainer listId={params.id} />
);

export default QuizListPage;
