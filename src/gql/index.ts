import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: { input: any; output: any; }
};

export type CopyGenreSetInput = {
  databaseId: Scalars['String']['input'];
};

export type CreateGenreInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  genreSetDatabaseId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  parentGenreDatabaseId?: InputMaybe<Scalars['String']['input']>;
  ratio?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateGenreSetInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateQuizInput = {
  answer?: InputMaybe<Scalars['String']['input']>;
  explanation?: InputMaybe<Scalars['String']['input']>;
  question?: InputMaybe<Scalars['String']['input']>;
  quizListDatabaseId: Scalars['String']['input'];
};

export type CreateQuizListInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  genreSetId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type DeleteGenreInput = {
  databaseId: Scalars['String']['input'];
};

export type DeleteGenreSetInput = {
  databaseId: Scalars['String']['input'];
};

export type DeleteQuizInput = {
  quizDatabaseId: Scalars['String']['input'];
};

export type DeleteQuizListInput = {
  databaseId: Scalars['String']['input'];
};

export type DeleteUserInput = {
  userId: Scalars['String']['input'];
};

export type Genre = Node & {
  __typename?: 'Genre';
  childGenres: Array<Genre>;
  databaseId: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  genreSet: GenreSet;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  parentGenre?: Maybe<Genre>;
  quizzes: Array<Quiz>;
  ratio?: Maybe<Scalars['Int']['output']>;
};

export type GenreSet = Node & {
  __typename?: 'GenreSet';
  databaseId: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  genres: Array<Genre>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  quizLists: Array<QuizList>;
  user: User;
};

export type GetGenreInput = {
  databaseId?: InputMaybe<Scalars['String']['input']>;
};

export type GetGenreSetInput = {
  databaseId?: InputMaybe<Scalars['String']['input']>;
};

export type GetGenreSetsInput = {
  userDatabaseId?: InputMaybe<Scalars['String']['input']>;
};

export type GetGenresInput = {
  genreSetDatabaseId?: InputMaybe<Scalars['String']['input']>;
};

export type GetQuizInput = {
  databaseId?: InputMaybe<Scalars['String']['input']>;
};

export type GetQuizListInput = {
  databaseId?: InputMaybe<Scalars['String']['input']>;
};

export type GetQuizListsInput = {
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type GetQuizzesInput = {
  quizListDatabaseId?: InputMaybe<Scalars['String']['input']>;
};

export type GetUserInput = {
  userId: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  copyGenreSet: GenreSet;
  createGenre: Genre;
  createGenreSet: GenreSet;
  createQuiz: Quiz;
  createQuizList: QuizList;
  deleteGenre: Genre;
  deleteGenreSet: GenreSet;
  deleteQuiz: Quiz;
  deleteQuizList: QuizList;
  deleteUser: User;
  updateGenre: Genre;
  updateGenreSet: GenreSet;
  updateLoginUser: User;
  updateQuiz: Quiz;
  updateQuizList: QuizList;
  updateUser: User;
};


export type MutationCopyGenreSetArgs = {
  input: CopyGenreSetInput;
};


export type MutationCreateGenreArgs = {
  input: CreateGenreInput;
};


export type MutationCreateGenreSetArgs = {
  input: CreateGenreSetInput;
};


export type MutationCreateQuizArgs = {
  input: CreateQuizInput;
};


export type MutationCreateQuizListArgs = {
  input: CreateQuizListInput;
};


export type MutationDeleteGenreArgs = {
  input: DeleteGenreInput;
};


export type MutationDeleteGenreSetArgs = {
  input: DeleteGenreSetInput;
};


export type MutationDeleteQuizArgs = {
  input: DeleteQuizInput;
};


export type MutationDeleteQuizListArgs = {
  input: DeleteQuizListInput;
};


export type MutationDeleteUserArgs = {
  input: DeleteUserInput;
};


export type MutationUpdateGenreArgs = {
  input: UpdateGenreInput;
};


export type MutationUpdateGenreSetArgs = {
  input: UpdateGenreSetInput;
};


export type MutationUpdateLoginUserArgs = {
  input: UpdateLoginUserInput;
};


export type MutationUpdateQuizArgs = {
  input: UpdateQuizInput;
};


export type MutationUpdateQuizListArgs = {
  input: UpdateQuizListInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type Node = {
  id: Scalars['ID']['output'];
};

export type Query = {
  __typename?: 'Query';
  getGenre: Genre;
  getGenreSet: GenreSet;
  getGenreSets: Array<GenreSet>;
  getGenres: Array<Genre>;
  getQuiz: Quiz;
  getQuizList: QuizList;
  getQuizLists: Array<QuizList>;
  getQuizzes: Array<Quiz>;
  getUser: User;
  loginUser: User;
  node?: Maybe<Node>;
  nodes: Array<Maybe<Node>>;
};


export type QueryGetGenreArgs = {
  input?: InputMaybe<GetGenreInput>;
};


export type QueryGetGenreSetArgs = {
  input?: InputMaybe<GetGenreSetInput>;
};


export type QueryGetGenreSetsArgs = {
  input?: InputMaybe<GetGenreSetsInput>;
};


export type QueryGetGenresArgs = {
  input?: InputMaybe<GetGenresInput>;
};


export type QueryGetQuizArgs = {
  input?: InputMaybe<GetQuizInput>;
};


export type QueryGetQuizListArgs = {
  input?: InputMaybe<GetQuizListInput>;
};


export type QueryGetQuizListsArgs = {
  input?: InputMaybe<GetQuizListsInput>;
};


export type QueryGetQuizzesArgs = {
  input: GetQuizzesInput;
};


export type QueryGetUserArgs = {
  input: GetUserInput;
};


export type QueryNodeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryNodesArgs = {
  ids: Array<Scalars['ID']['input']>;
};

export type Quiz = Node & {
  __typename?: 'Quiz';
  answer?: Maybe<Scalars['String']['output']>;
  databaseId: Scalars['String']['output'];
  explanation?: Maybe<Scalars['String']['output']>;
  genre: Genre;
  id: Scalars['ID']['output'];
  otherAnswer?: Maybe<Scalars['String']['output']>;
  question?: Maybe<Scalars['String']['output']>;
  quizList: QuizList;
  source?: Maybe<Scalars['String']['output']>;
  user: User;
};

export type QuizList = Node & {
  __typename?: 'QuizList';
  databaseId: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  genreSet: GenreSet;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  quizzes: Array<Quiz>;
  user: User;
};

export type UpdateGenreInput = {
  databaseId: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parentGenreDatabaseId?: InputMaybe<Scalars['String']['input']>;
  ratio?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateGenreSetInput = {
  databaseId: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateLoginUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  newUserId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateQuizInput = {
  answer?: InputMaybe<Scalars['String']['input']>;
  explanation?: InputMaybe<Scalars['String']['input']>;
  otherAnswer?: InputMaybe<Scalars['String']['input']>;
  question?: InputMaybe<Scalars['String']['input']>;
  quizDatabaseId: Scalars['String']['input'];
  source?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateQuizListInput = {
  databaseId: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  newUserId?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['String']['input'];
};

export type User = Node & {
  __typename?: 'User';
  databaseId: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  quizLists: Array<QuizList>;
  quizzes: Array<Quiz>;
  role: UserRole;
  userId?: Maybe<Scalars['String']['output']>;
};

export enum UserRole {
  Admin = 'ADMIN',
  User = 'USER'
}

export type GetGenreSetsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGenreSetsQuery = { __typename?: 'Query', getGenreSets: Array<{ __typename?: 'GenreSet', id: string, name: string, description?: string | null, databaseId: string }> };

export type CreateQuizMutationVariables = Exact<{
  input: CreateQuizInput;
}>;


export type CreateQuizMutation = { __typename?: 'Mutation', createQuiz: { __typename?: 'Quiz', id: string, databaseId: string } };

export type DeleteQuizMutationVariables = Exact<{
  input: DeleteQuizInput;
}>;


export type DeleteQuizMutation = { __typename?: 'Mutation', deleteQuiz: { __typename?: 'Quiz', id: string, databaseId: string } };

export type GetQuizQueryVariables = Exact<{
  input?: InputMaybe<GetQuizInput>;
}>;


export type GetQuizQuery = { __typename?: 'Query', getQuiz: { __typename?: 'Quiz', explanation?: string | null, databaseId: string, answer?: string | null, otherAnswer?: string | null, source?: string | null, id: string, question?: string | null } };

export type GetQuizzesQueryVariables = Exact<{
  input: GetQuizzesInput;
}>;


export type GetQuizzesQuery = { __typename?: 'Query', getQuizzes: Array<{ __typename?: 'Quiz', answer?: string | null, databaseId: string, explanation?: string | null, otherAnswer?: string | null, source?: string | null, id: string, question?: string | null }> };

export type UpdateQuizMutationVariables = Exact<{
  input: UpdateQuizInput;
}>;


export type UpdateQuizMutation = { __typename?: 'Mutation', updateQuiz: { __typename?: 'Quiz', id: string, databaseId: string } };

export type CreateQuizListMutationVariables = Exact<{
  input: CreateQuizListInput;
}>;


export type CreateQuizListMutation = { __typename?: 'Mutation', createQuizList: { __typename?: 'QuizList', id: string, name: string, databaseId: string, description?: string | null } };

export type DeleteQuizListMutationVariables = Exact<{
  input: DeleteQuizListInput;
}>;


export type DeleteQuizListMutation = { __typename?: 'Mutation', deleteQuizList: { __typename?: 'QuizList', id: string } };

export type GetQuizListQueryVariables = Exact<{
  input?: InputMaybe<GetQuizListInput>;
}>;


export type GetQuizListQuery = { __typename?: 'Query', getQuizList: { __typename?: 'QuizList', name: string, databaseId: string, description?: string | null, id: string } };

export type GetQuizListsQueryVariables = Exact<{
  input?: InputMaybe<GetQuizListsInput>;
}>;


export type GetQuizListsQuery = { __typename?: 'Query', getQuizLists: Array<{ __typename?: 'QuizList', description?: string | null, name: string, databaseId: string, id: string }> };

export type UpdateQuizListMutationVariables = Exact<{
  input: UpdateQuizListInput;
}>;


export type UpdateQuizListMutation = { __typename?: 'Mutation', updateQuizList: { __typename?: 'QuizList', description?: string | null, name: string, id: string, databaseId: string } };

export type GetLoginUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLoginUserQuery = { __typename?: 'Query', loginUser: { __typename?: 'User', id: string, image?: string | null, name?: string | null, userId?: string | null, email?: string | null } };

export type UpdateLoginUserMutationVariables = Exact<{
  input: UpdateLoginUserInput;
}>;


export type UpdateLoginUserMutation = { __typename?: 'Mutation', updateLoginUser: { __typename?: 'User', id: string } };


export const GetGenreSetsDocument = gql`
    query GetGenreSets {
  getGenreSets {
    id
    name
    description
    databaseId
  }
}
    `;

/**
 * __useGetGenreSetsQuery__
 *
 * To run a query within a React component, call `useGetGenreSetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGenreSetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGenreSetsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetGenreSetsQuery(baseOptions?: Apollo.QueryHookOptions<GetGenreSetsQuery, GetGenreSetsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGenreSetsQuery, GetGenreSetsQueryVariables>(GetGenreSetsDocument, options);
      }
export function useGetGenreSetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGenreSetsQuery, GetGenreSetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGenreSetsQuery, GetGenreSetsQueryVariables>(GetGenreSetsDocument, options);
        }
export type GetGenreSetsQueryHookResult = ReturnType<typeof useGetGenreSetsQuery>;
export type GetGenreSetsLazyQueryHookResult = ReturnType<typeof useGetGenreSetsLazyQuery>;
export type GetGenreSetsQueryResult = Apollo.QueryResult<GetGenreSetsQuery, GetGenreSetsQueryVariables>;
export const CreateQuizDocument = gql`
    mutation CreateQuiz($input: CreateQuizInput!) {
  createQuiz(input: $input) {
    id
    databaseId
  }
}
    `;
export type CreateQuizMutationFn = Apollo.MutationFunction<CreateQuizMutation, CreateQuizMutationVariables>;

/**
 * __useCreateQuizMutation__
 *
 * To run a mutation, you first call `useCreateQuizMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateQuizMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createQuizMutation, { data, loading, error }] = useCreateQuizMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateQuizMutation(baseOptions?: Apollo.MutationHookOptions<CreateQuizMutation, CreateQuizMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateQuizMutation, CreateQuizMutationVariables>(CreateQuizDocument, options);
      }
export type CreateQuizMutationHookResult = ReturnType<typeof useCreateQuizMutation>;
export type CreateQuizMutationResult = Apollo.MutationResult<CreateQuizMutation>;
export type CreateQuizMutationOptions = Apollo.BaseMutationOptions<CreateQuizMutation, CreateQuizMutationVariables>;
export const DeleteQuizDocument = gql`
    mutation DeleteQuiz($input: DeleteQuizInput!) {
  deleteQuiz(input: $input) {
    id
    databaseId
  }
}
    `;
export type DeleteQuizMutationFn = Apollo.MutationFunction<DeleteQuizMutation, DeleteQuizMutationVariables>;

/**
 * __useDeleteQuizMutation__
 *
 * To run a mutation, you first call `useDeleteQuizMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteQuizMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteQuizMutation, { data, loading, error }] = useDeleteQuizMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteQuizMutation(baseOptions?: Apollo.MutationHookOptions<DeleteQuizMutation, DeleteQuizMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteQuizMutation, DeleteQuizMutationVariables>(DeleteQuizDocument, options);
      }
export type DeleteQuizMutationHookResult = ReturnType<typeof useDeleteQuizMutation>;
export type DeleteQuizMutationResult = Apollo.MutationResult<DeleteQuizMutation>;
export type DeleteQuizMutationOptions = Apollo.BaseMutationOptions<DeleteQuizMutation, DeleteQuizMutationVariables>;
export const GetQuizDocument = gql`
    query GetQuiz($input: GetQuizInput) {
  getQuiz(input: $input) {
    explanation
    databaseId
    answer
    otherAnswer
    source
    id
    question
  }
}
    `;

/**
 * __useGetQuizQuery__
 *
 * To run a query within a React component, call `useGetQuizQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQuizQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQuizQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetQuizQuery(baseOptions?: Apollo.QueryHookOptions<GetQuizQuery, GetQuizQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetQuizQuery, GetQuizQueryVariables>(GetQuizDocument, options);
      }
export function useGetQuizLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetQuizQuery, GetQuizQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetQuizQuery, GetQuizQueryVariables>(GetQuizDocument, options);
        }
export type GetQuizQueryHookResult = ReturnType<typeof useGetQuizQuery>;
export type GetQuizLazyQueryHookResult = ReturnType<typeof useGetQuizLazyQuery>;
export type GetQuizQueryResult = Apollo.QueryResult<GetQuizQuery, GetQuizQueryVariables>;
export const GetQuizzesDocument = gql`
    query GetQuizzes($input: GetQuizzesInput!) {
  getQuizzes(input: $input) {
    answer
    databaseId
    explanation
    otherAnswer
    source
    id
    question
  }
}
    `;

/**
 * __useGetQuizzesQuery__
 *
 * To run a query within a React component, call `useGetQuizzesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQuizzesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQuizzesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetQuizzesQuery(baseOptions: Apollo.QueryHookOptions<GetQuizzesQuery, GetQuizzesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetQuizzesQuery, GetQuizzesQueryVariables>(GetQuizzesDocument, options);
      }
export function useGetQuizzesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetQuizzesQuery, GetQuizzesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetQuizzesQuery, GetQuizzesQueryVariables>(GetQuizzesDocument, options);
        }
export type GetQuizzesQueryHookResult = ReturnType<typeof useGetQuizzesQuery>;
export type GetQuizzesLazyQueryHookResult = ReturnType<typeof useGetQuizzesLazyQuery>;
export type GetQuizzesQueryResult = Apollo.QueryResult<GetQuizzesQuery, GetQuizzesQueryVariables>;
export const UpdateQuizDocument = gql`
    mutation UpdateQuiz($input: UpdateQuizInput!) {
  updateQuiz(input: $input) {
    id
    databaseId
  }
}
    `;
export type UpdateQuizMutationFn = Apollo.MutationFunction<UpdateQuizMutation, UpdateQuizMutationVariables>;

/**
 * __useUpdateQuizMutation__
 *
 * To run a mutation, you first call `useUpdateQuizMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateQuizMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateQuizMutation, { data, loading, error }] = useUpdateQuizMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateQuizMutation(baseOptions?: Apollo.MutationHookOptions<UpdateQuizMutation, UpdateQuizMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateQuizMutation, UpdateQuizMutationVariables>(UpdateQuizDocument, options);
      }
export type UpdateQuizMutationHookResult = ReturnType<typeof useUpdateQuizMutation>;
export type UpdateQuizMutationResult = Apollo.MutationResult<UpdateQuizMutation>;
export type UpdateQuizMutationOptions = Apollo.BaseMutationOptions<UpdateQuizMutation, UpdateQuizMutationVariables>;
export const CreateQuizListDocument = gql`
    mutation CreateQuizList($input: CreateQuizListInput!) {
  createQuizList(input: $input) {
    id
    name
    databaseId
    description
  }
}
    `;
export type CreateQuizListMutationFn = Apollo.MutationFunction<CreateQuizListMutation, CreateQuizListMutationVariables>;

/**
 * __useCreateQuizListMutation__
 *
 * To run a mutation, you first call `useCreateQuizListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateQuizListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createQuizListMutation, { data, loading, error }] = useCreateQuizListMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateQuizListMutation(baseOptions?: Apollo.MutationHookOptions<CreateQuizListMutation, CreateQuizListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateQuizListMutation, CreateQuizListMutationVariables>(CreateQuizListDocument, options);
      }
export type CreateQuizListMutationHookResult = ReturnType<typeof useCreateQuizListMutation>;
export type CreateQuizListMutationResult = Apollo.MutationResult<CreateQuizListMutation>;
export type CreateQuizListMutationOptions = Apollo.BaseMutationOptions<CreateQuizListMutation, CreateQuizListMutationVariables>;
export const DeleteQuizListDocument = gql`
    mutation DeleteQuizList($input: DeleteQuizListInput!) {
  deleteQuizList(input: $input) {
    id
  }
}
    `;
export type DeleteQuizListMutationFn = Apollo.MutationFunction<DeleteQuizListMutation, DeleteQuizListMutationVariables>;

/**
 * __useDeleteQuizListMutation__
 *
 * To run a mutation, you first call `useDeleteQuizListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteQuizListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteQuizListMutation, { data, loading, error }] = useDeleteQuizListMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteQuizListMutation(baseOptions?: Apollo.MutationHookOptions<DeleteQuizListMutation, DeleteQuizListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteQuizListMutation, DeleteQuizListMutationVariables>(DeleteQuizListDocument, options);
      }
export type DeleteQuizListMutationHookResult = ReturnType<typeof useDeleteQuizListMutation>;
export type DeleteQuizListMutationResult = Apollo.MutationResult<DeleteQuizListMutation>;
export type DeleteQuizListMutationOptions = Apollo.BaseMutationOptions<DeleteQuizListMutation, DeleteQuizListMutationVariables>;
export const GetQuizListDocument = gql`
    query GetQuizList($input: GetQuizListInput) {
  getQuizList(input: $input) {
    name
    databaseId
    description
    id
  }
}
    `;

/**
 * __useGetQuizListQuery__
 *
 * To run a query within a React component, call `useGetQuizListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQuizListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQuizListQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetQuizListQuery(baseOptions?: Apollo.QueryHookOptions<GetQuizListQuery, GetQuizListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetQuizListQuery, GetQuizListQueryVariables>(GetQuizListDocument, options);
      }
export function useGetQuizListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetQuizListQuery, GetQuizListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetQuizListQuery, GetQuizListQueryVariables>(GetQuizListDocument, options);
        }
export type GetQuizListQueryHookResult = ReturnType<typeof useGetQuizListQuery>;
export type GetQuizListLazyQueryHookResult = ReturnType<typeof useGetQuizListLazyQuery>;
export type GetQuizListQueryResult = Apollo.QueryResult<GetQuizListQuery, GetQuizListQueryVariables>;
export const GetQuizListsDocument = gql`
    query GetQuizLists($input: GetQuizListsInput) {
  getQuizLists(input: $input) {
    description
    name
    databaseId
    id
  }
}
    `;

/**
 * __useGetQuizListsQuery__
 *
 * To run a query within a React component, call `useGetQuizListsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQuizListsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQuizListsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetQuizListsQuery(baseOptions?: Apollo.QueryHookOptions<GetQuizListsQuery, GetQuizListsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetQuizListsQuery, GetQuizListsQueryVariables>(GetQuizListsDocument, options);
      }
export function useGetQuizListsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetQuizListsQuery, GetQuizListsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetQuizListsQuery, GetQuizListsQueryVariables>(GetQuizListsDocument, options);
        }
export type GetQuizListsQueryHookResult = ReturnType<typeof useGetQuizListsQuery>;
export type GetQuizListsLazyQueryHookResult = ReturnType<typeof useGetQuizListsLazyQuery>;
export type GetQuizListsQueryResult = Apollo.QueryResult<GetQuizListsQuery, GetQuizListsQueryVariables>;
export const UpdateQuizListDocument = gql`
    mutation UpdateQuizList($input: UpdateQuizListInput!) {
  updateQuizList(input: $input) {
    description
    name
    id
    databaseId
  }
}
    `;
export type UpdateQuizListMutationFn = Apollo.MutationFunction<UpdateQuizListMutation, UpdateQuizListMutationVariables>;

/**
 * __useUpdateQuizListMutation__
 *
 * To run a mutation, you first call `useUpdateQuizListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateQuizListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateQuizListMutation, { data, loading, error }] = useUpdateQuizListMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateQuizListMutation(baseOptions?: Apollo.MutationHookOptions<UpdateQuizListMutation, UpdateQuizListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateQuizListMutation, UpdateQuizListMutationVariables>(UpdateQuizListDocument, options);
      }
export type UpdateQuizListMutationHookResult = ReturnType<typeof useUpdateQuizListMutation>;
export type UpdateQuizListMutationResult = Apollo.MutationResult<UpdateQuizListMutation>;
export type UpdateQuizListMutationOptions = Apollo.BaseMutationOptions<UpdateQuizListMutation, UpdateQuizListMutationVariables>;
export const GetLoginUserDocument = gql`
    query GetLoginUser {
  loginUser {
    id
    image
    name
    userId
    email
  }
}
    `;

/**
 * __useGetLoginUserQuery__
 *
 * To run a query within a React component, call `useGetLoginUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLoginUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLoginUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLoginUserQuery(baseOptions?: Apollo.QueryHookOptions<GetLoginUserQuery, GetLoginUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLoginUserQuery, GetLoginUserQueryVariables>(GetLoginUserDocument, options);
      }
export function useGetLoginUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLoginUserQuery, GetLoginUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLoginUserQuery, GetLoginUserQueryVariables>(GetLoginUserDocument, options);
        }
export type GetLoginUserQueryHookResult = ReturnType<typeof useGetLoginUserQuery>;
export type GetLoginUserLazyQueryHookResult = ReturnType<typeof useGetLoginUserLazyQuery>;
export type GetLoginUserQueryResult = Apollo.QueryResult<GetLoginUserQuery, GetLoginUserQueryVariables>;
export const UpdateLoginUserDocument = gql`
    mutation UpdateLoginUser($input: UpdateLoginUserInput!) {
  updateLoginUser(input: $input) {
    id
  }
}
    `;
export type UpdateLoginUserMutationFn = Apollo.MutationFunction<UpdateLoginUserMutation, UpdateLoginUserMutationVariables>;

/**
 * __useUpdateLoginUserMutation__
 *
 * To run a mutation, you first call `useUpdateLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLoginUserMutation, { data, loading, error }] = useUpdateLoginUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateLoginUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateLoginUserMutation, UpdateLoginUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateLoginUserMutation, UpdateLoginUserMutationVariables>(UpdateLoginUserDocument, options);
      }
export type UpdateLoginUserMutationHookResult = ReturnType<typeof useUpdateLoginUserMutation>;
export type UpdateLoginUserMutationResult = Apollo.MutationResult<UpdateLoginUserMutation>;
export type UpdateLoginUserMutationOptions = Apollo.BaseMutationOptions<UpdateLoginUserMutation, UpdateLoginUserMutationVariables>;