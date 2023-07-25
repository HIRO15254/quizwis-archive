import { useDisclosure } from '@mantine/hooks';

import { useGetQuizListStatDataLazyQuery } from 'gql';

interface GenreTree {
  data: {
    id: string;
    databaseId: string;
    name: string;
    color: string;
    ratio: number;
    ratioPercent: number;
    allRatioPercent: number;
    count: number;
  };
  children: GenreTree[];
}

interface UseQuizListStatModalProps {
  listId: string;
}

export const useQuizListStatModal = (props: UseQuizListStatModalProps) => {
  const { listId } = props;

  const [opened, handlers] = useDisclosure();
  const [getQuizListStat, { data }] = useGetQuizListStatDataLazyQuery(
    { fetchPolicy: 'cache-and-network' },
  );

  const open = () => {
    getQuizListStat({
      variables: {
        input: {
          databaseId: listId,
        },
      },
    }).then(() => {
      handlers.open();
    });
  };

  const newHandlers = {
    ...handlers,
    open,
  };

  const genresData = data?.getQuizList.genreSet?.genres ?? [];
  const quizzes = data?.getQuizList.quizzes ?? [];

  function getChildrenTree(
    genreId: string,
    ratioSum: number,
    parentAllRatio: number,
  ): GenreTree {
    const targetGenre = genresData.find((genre) => genre.id === genreId);
    if (targetGenre === undefined) {
      throw new Error('genreListToTree: genre not found');
    }
    const ratio = (targetGenre.ratio) / ratioSum;
    const allRatio = (targetGenre.ratio * parentAllRatio) / ratioSum;
    const childGenres = genresData.filter((genre) => genre.parentGenre?.id === genreId);
    const ret: GenreTree = {
      data: {
        ...targetGenre,
        count: quizzes.filter((quiz) => quiz.genre?.id === genreId).length,
        ratioPercent: ratio * 100,
        allRatioPercent: allRatio * 100,
      },
      children: [],
    };
    const childRatioSum = childGenres.reduce((sum, genre) => sum + genre.ratio, 0);
    targetGenre.childGenres.forEach((childGenre) => {
      ret.children.push(getChildrenTree(childGenre.id, childRatioSum, allRatio));
    });
    return ret;
  }

  const genreTree: GenreTree[] = [];
  const rootGenres = genresData.filter((genre) => genre.parentGenre === null);
  const allGenreRatioSum = rootGenres.reduce((sum, genre) => sum + genre.ratio, 0);

  rootGenres.forEach((genre) => {
    genreTree.push(getChildrenTree(genre.id, allGenreRatioSum, 1));
  });

  function countGenre(genre: GenreTree) {
    let ret = genre.data.count;
    genre.children.forEach((child) => {
      ret += countGenre(child);
    });
    // eslint-disable-next-line no-param-reassign
    genre.data.count = ret;
    return ret;
  }

  genreTree.forEach((genre) => countGenre(genre));

  return {
    modalProps: {
      opened,
      close: handlers.close,
      data: {
        genres: genreTree,
        goal: data?.getQuizList.goal ?? 0,
        quizCount: quizzes.length,
      },
    },
    handlers: newHandlers,
  };
};
