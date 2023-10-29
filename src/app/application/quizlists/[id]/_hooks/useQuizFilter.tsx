import { useForm } from '@mantine/form';
import React from 'react';

import { QuizDataFragment, useGetGenresFromQuizListQuery } from 'gql';

import { GenreFilterSelect } from '../_components/GenreFilterSelect';

interface Props {
  quizListId: string;
  data: QuizDataFragment[];
}

type QuizFilterType = {
  genreId: string | null;
};

export const useQuizFilter = (props: Props) => {
  const {
    quizListId,
    data,
  } = props;

  const form = useForm<QuizFilterType>({
    initialValues: {
      genreId: null,
    },
  });

  const { data: genres } = useGetGenresFromQuizListQuery({
    variables: {
      input: {
        id: quizListId,
      },
    },
  });

  const filteredData = data.filter((quiz) => {
    if (form.values.genreId) {
      return quiz.genre?.id === form.values.genreId;
    }
    return true;
  });

  const genreFilterSelectProps = {
    genres: genres?.getQuizList.genreSet?.genres ?? [],
    ...form.getInputProps('genreId'),
  };

  return {
    filteredData,
    genreFilterSelect: <GenreFilterSelect {...genreFilterSelectProps} />,
  };
};
