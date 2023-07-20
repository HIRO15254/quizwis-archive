import React from 'react';

import { QuizTableContainer } from './_components/container/QuizTableContainer';

const QuizListListPage = ({ params }: { params: { id: string } }) => (
  <QuizTableContainer listId={params.id} />
);

export default QuizListListPage;
