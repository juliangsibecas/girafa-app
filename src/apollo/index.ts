import * as SecureStore from 'expo-secure-store';
import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';

import { env } from '../env';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

const tokenLink = setContext(async () => ({
  accessToken: await SecureStore.getItemAsync('accessToken'),
}));

const authLink = setContext(async (_, { accessToken, headers }) => {
  return {
    headers: {
      ...headers,
      Authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const httpLink = createHttpLink({
  uri: `${env.apiUrl}/graphql`,
  credentials: 'include',
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: `${env.apiUrl}/graphql`,
    connectionParams: async () => {
      return {
        Authorization: `Bearer ${await SecureStore.getItemAsync(
          'accessToken'
        )}`,
      };
    },
  })
);

const links = [tokenLink, authLink, errorLink];

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  ApolloLink.from([...links, wsLink]),
  ApolloLink.from([...links, httpLink])
);

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

export * from './utils';
