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

export type CreateQuizListInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  genreSetId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type DeleteUserInput = {
  userId: Scalars['String']['input'];
};

export type Genre = Node & {
  __typename?: 'Genre';
  childGenres: Array<Genre>;
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
  description?: Maybe<Scalars['String']['output']>;
  genres: Array<Genre>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  quizLists: Array<QuizList>;
  user: User;
};

export type GetQuizListsInput = {
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type GetUserInput = {
  userId: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createQuizList: QuizList;
  deleteUser: User;
  updateLoginUser: User;
  updateUser: User;
};


export type MutationCreateQuizListArgs = {
  input: CreateQuizListInput;
};


export type MutationDeleteUserArgs = {
  input: DeleteUserInput;
};


export type MutationUpdateLoginUserArgs = {
  input: UpdateLoginUserInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type Node = {
  id: Scalars['ID']['output'];
};

export type Query = {
  __typename?: 'Query';
  getQuizLists: Array<QuizList>;
  getUser: User;
  loginUser: User;
  node?: Maybe<Node>;
  nodes: Array<Maybe<Node>>;
};


export type QueryGetQuizListsArgs = {
  input?: InputMaybe<GetQuizListsInput>;
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
  explanation?: Maybe<Scalars['String']['output']>;
  genre: Genre;
  id: Scalars['ID']['output'];
  question?: Maybe<Scalars['String']['output']>;
  quizList: QuizList;
  user: User;
};

export type QuizList = Node & {
  __typename?: 'QuizList';
  description?: Maybe<Scalars['String']['output']>;
  genreSet: GenreSet;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  quizzes: Array<Quiz>;
  user: User;
};

export type UpdateLoginUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  newUserId?: InputMaybe<Scalars['String']['input']>;
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

export type CreateQuizListMutationVariables = Exact<{
  input: CreateQuizListInput;
}>;


export type CreateQuizListMutation = { __typename?: 'Mutation', createQuizList: { __typename?: 'QuizList', id: string, name: string, description?: string | null } };

export type GetQuizListsQueryVariables = Exact<{
  getQuizListsInput?: InputMaybe<GetQuizListsInput>;
}>;


export type GetQuizListsQuery = { __typename?: 'Query', getQuizLists: Array<{ __typename?: 'QuizList', description?: string | null, name: string, id: string }> };

export type GetLoginUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLoginUserQuery = { __typename?: 'Query', loginUser: { __typename?: 'User', id: string, image?: string | null, name?: string | null, userId?: string | null, email?: string | null } };

export type UpdateLoginUserMutationVariables = Exact<{
  input: UpdateLoginUserInput;
}>;


export type UpdateLoginUserMutation = { __typename?: 'Mutation', updateLoginUser: { __typename?: 'User', id: string } };


export const CreateQuizListDocument = gql`
    mutation CreateQuizList($input: CreateQuizListInput!) {
  createQuizList(input: $input) {
    id
    name
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
export const GetQuizListsDocument = gql`
    query GetQuizLists($getQuizListsInput: GetQuizListsInput) {
  getQuizLists(input: $getQuizListsInput) {
    description
    name
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
 *      getQuizListsInput: // value for 'getQuizListsInput'
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