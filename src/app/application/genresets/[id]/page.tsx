import React from 'react';

import { GenreTableContainer } from './_containers/GenreTableContainer';

export const metadata = {
  title: 'ジャンルセット詳細 - QuizWis',
};

const QuizListPage = ({ params }: { params: { id: string } }) => (
  <GenreTableContainer genreSetDatabaseId={params.id} />
);

export default QuizListPage;
