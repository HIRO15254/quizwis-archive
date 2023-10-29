import { encodeGlobalID } from '@pothos/plugin-relay';
import React from 'react';

import { QuizTableContainer } from './_containers/QuizTableContainer';

export const metadata = {
  title: '問題リスト詳細 - QuizWis',
};

const QuizListPage = async ({ params }: { params: { id: string } }) => {
  const id = encodeGlobalID('QuizList', params.id);
  return (
    <QuizTableContainer listId={id} />
  );
};

export default QuizListPage;
