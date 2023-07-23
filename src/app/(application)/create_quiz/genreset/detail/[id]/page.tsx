import React from 'react';

import { GenreTableContainer } from './_components/container/GenreTableContainer';

export const metadata = {
  title: 'ジャンルセット詳細 - QuizWis',
};

const QuizListPage = ({ params }: { params: { id: string } }) => (
  <GenreTableContainer setId={params.id} />
);

export default QuizListPage;
