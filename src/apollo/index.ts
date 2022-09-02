import * as SecureStore from 'expo-secure-store';
import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import jwtDecode, { JwtPayload } from 'jwt-decode';

import { env } from '../env';
import { SignInFromRefreshTokenMutationResult } from '../api';

const REFRESH_TOKEN_QUERY = `
  mutation {
    signInFromRefreshToken {
      userId
      accessToken
      refreshToken
    }
  }
`;

const httpLink = createHttpLink({
  uri: `${env.apiUrl}/graphql`,
  credentials: 'include',
});

const authLink = setContext(async (_, { headers }) => {
  const token = await SecureStore.getItemAsync('accessToken');

  return {
    accessToken: token,
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const tokenRefreshLink = new TokenRefreshLink<{
  accessToken: string;
  refreshToken: string;
}>({
  isTokenValidOrUndefined: async (operation) => {
    try {
      const token: string = operation.getContext().accessToken;
      if (token) {
        const decoded = jwtDecode(
          operation.getContext().accessToken
        ) as JwtPayload;

        return Date.now() > decoded.exp!;
      }

      return false;
    } catch (e) {
      console.log(e);

      return false;
    }
  },
  fetchAccessToken: async () => {
    try {
      const res = await fetch(`${env.apiUrl}/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Refresh: (await SecureStore.getItemAsync('refreshToken'))!,
        },
        body: JSON.stringify({
          query: REFRESH_TOKEN_QUERY,
        }),
      });

      return res.json();
    } catch (e) {
      console.log(e);
      return new Response();
    }
  },
  handleResponse: () => (response: SignInFromRefreshTokenMutationResult) => {
    const accessToken = response.data?.signInFromRefreshToken;
    return { access_token: accessToken };
  },
  handleFetch: async ({ accessToken, refreshToken }) => {
    await SecureStore.setItemAsync('accessToken', accessToken);
    await SecureStore.setItemAsync('refreshToken', refreshToken);
  },
  handleError: (err) => {
    console.log(err);
  },
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([authLink, tokenRefreshLink, httpLink]),
});
