import React, { useState } from 'react';

import { QuizFilterInput, useGetGenresFromQuizListQuery } from 'gql';

import { GenreFilterSelect } from '../_components/presenter/GenreFilterSelect';

interface Props {
  quizListId: string;
}

export const useQuizFilter = (props: Props) => {
  const {
    quizListId,
  } = props;

  const { data: genres } = useGetGenresFromQuizListQuery({
    variables: {
      input: {
        id: quizListId,
      },
    },
  });

  const [
    filter,
    setFilter,
  ] = useState<QuizFilterInput>({
    genreId: null,
  });

  const onGenreFilterChange = (newGenreId: string | null) => {
    const newFilter = {
      ...filter,
      genreId: newGenreId ?? undefined,
    };
    setFilter(newFilter);
  };

  const genreFilterSelectProps = {
    genres: genres?.getQuizList.genreSet?.genres ?? [],
    value: filter.genreId ?? null,
    onChange: onGenreFilterChange,
  };

  return {
    filterData: filter,
    genreFilterSelect: <GenreFilterSelect {...genreFilterSelectProps} />,
  };
};
