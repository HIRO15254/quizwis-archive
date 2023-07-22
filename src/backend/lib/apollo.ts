import { ApolloServer } from '@apollo/server';

import { Context } from './context';
import { schema } from '../schema';

export const server = new ApolloServer<Context>(
  {
    schema,
    introspection: true,
  },
);
