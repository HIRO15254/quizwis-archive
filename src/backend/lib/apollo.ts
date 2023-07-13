import { ApolloServer } from '@apollo/server';

import { schema } from '../schema';
import { Context } from './context';

export const server = new ApolloServer<Context>(
  {
    schema,
    introspection: true,
  },
);
