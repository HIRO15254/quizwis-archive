'use client';

import { ApolloProvider } from '@apollo/client';
import React from 'react';

import { apolloClient } from 'lib/apolloClient';

export const GqlProvider = ({ children }: { children: React.ReactNode }) => (
  <ApolloProvider client={apolloClient}>
    {children}
  </ApolloProvider>
);
