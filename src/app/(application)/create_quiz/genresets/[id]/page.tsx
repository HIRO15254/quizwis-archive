import React from 'react';

import { GenreTableContainer } from './_components/container/GenreTableContainer';

const QuizListPage = ({ params }: { params: { id: string } }) => (
  <GenreTableContainer setId={params.id} />
);

export default QuizListPage;
