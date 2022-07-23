import * as SecureStore from 'expo-secure-store';
import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { TokenRefreshLink } from 'apollo-link-token-refresh';

const httpLink = createHttpLink({
  uri: 'http://192.168.68.117:4000/graphql',
  credentials: 'include',
});

const authLink = setContext(async (_, { headers }) => {
  const token = await SecureStore.getItemAsync('accessToken');

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const tokenRefreshLink = new TokenRefreshLink({
  fetchAccessToken: async () => {
    return fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        Refresh: (await SecureStore.getItemAsync('refreshToken')) as string,
      },
    });
  },
  handleFetch: () => {
    return {
      accessToken: '',
    };
  },
  isTokenValidOrUndefined: () => false,
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([authLink, httpLink]),
});
