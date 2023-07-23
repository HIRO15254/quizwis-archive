import { GetGenreDetailPageDataQuery } from 'gql';

export interface GenreTree {
  data: GetGenreDetailPageDataQuery['getGenreSet']['genres'][0];
  children: GenreTree[];
}

export function genreListToTree(genreList: GetGenreDetailPageDataQuery['getGenreSet']['genres']): GenreTree[] {
  function getChildrenTree(genreId: string): GenreTree {
    const targetGenre = genreList.find((genre) => genre.id === genreId);
    if (targetGenre === undefined) {
      throw new Error('genreListToTree: genre not found');
    }
    const ret: GenreTree = {
      data: targetGenre,
      children: [],
    };
    targetGenre.childGenres.forEach((childGenre) => {
      ret.children.push(getChildrenTree(childGenre.id));
    });
    return ret;
  }

  const genreTree: GenreTree[] = [];
  genreList.forEach((genre) => {
    if (genre.parentGenre === null) {
      genreTree.push(getChildrenTree(genre.id));
    }
  });
  return genreTree;
}
