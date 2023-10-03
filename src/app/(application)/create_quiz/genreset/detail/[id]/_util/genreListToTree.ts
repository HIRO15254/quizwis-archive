export interface GenreTreeData {
  id: string;
  ratio: number;
  color: string;
  name: string;
  description: string;
  parentGenre?: {
    id: string;
  } | null;
  childGenres: {
    id: string;
  }[];
}
export interface GenreTree {
  data: GenreTreeData & { ratioPercent: number, allRatioPercent: number }
  children: GenreTree[];
}

export function genreListToTree(genreList: GenreTreeData[]): GenreTree[] {
  function getChildrenTree(
    genreId: string,
    ratioSum: number,
    parentAllRatio: number,
  ): GenreTree {
    const targetGenre = genreList.find((genre) => genre.id === genreId);
    if (targetGenre === undefined) {
      throw new Error('genreListToTree: genre not found');
    }
    const ratio = (targetGenre.ratio) / ratioSum;
    const allRatio = (targetGenre.ratio * parentAllRatio) / ratioSum;
    const ret: GenreTree = {
      data: {
        ...targetGenre,
        ratioPercent: ratio * 100,
        allRatioPercent: allRatio * 100,
      },
      children: [],
    };
    const childRatioSum = genreList.filter(
      (genre) => genre.parentGenre?.id === genreId,
    ).reduce((sum, genre) => sum + genre.ratio, 0);
    targetGenre.childGenres.forEach((childGenre) => {
      ret.children.push(getChildrenTree(childGenre.id, childRatioSum, allRatio));
    });
    return ret;
  }

  const genreTree: GenreTree[] = [];
  const allGenreRatioSum = genreList.filter(
    (genre) => genre.parentGenre === null,
  ).reduce((sum, genre) => sum + genre.ratio, 0);
  genreList.forEach((genre) => {
    if (genre.parentGenre === null) {
      genreTree.push(getChildrenTree(genre.id, allGenreRatioSum, 1));
    }
  });
  return genreTree;
}
