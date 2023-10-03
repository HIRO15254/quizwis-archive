import { CreateGenreInput } from 'gql';

export type GenreFormType = Omit<CreateGenreInput, 'genreSetId'>;
