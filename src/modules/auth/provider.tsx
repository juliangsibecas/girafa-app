import moment from 'moment';
import { ReactNode, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import jwtDecode from 'jwt-decode';

import { client } from '../../apollo';

import { AuthContext } from './context';
import { SignInPayload } from './types';

type Props = {
  children: ReactNode;
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  // const [signinFromRefreshToken] = useSignInFromRefreshTokenMutation();
  const [userId, setUserId] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fn = async () => {
      const storedAccessToken = await SecureStore.getItemAsync('accessToken');
      // const refreshToken = await SecureStore.getItemAsync('refreshToken');

      if (storedAccessToken) {
        const { userId, exp } = jwtDecode<{ userId: string; exp: number }>(
          storedAccessToken
        );

        if (moment.now() < exp * 1000) {
          setUserId(userId);
          setAccessToken(storedAccessToken);
          setLoading(false);
          return;
        }
      }

      // if (refreshToken) {
      //   try {
      //     const res = await signinFromRefreshToken({
      //       context: {
      //         headers: {
      //           Refresh: refreshToken,
      //         },
      //       },
      //     });

      //     const data = res.data!.signInFromRefreshToken;

      //     await SecureStore.setItemAsync('accessToken', data.accessToken);
      //     await SecureStore.setItemAsync('refreshToken', data.refreshToken);
      //     setAccessToken(data.accessToken);
      //     setUserId(data.userId);
      //   } catch (e) {
      //     setUserId('');
      //     console.log(e);
      //   }
      // }

      setLoading(false);
    };

    fn();
  }, []);

  const signIn = async ({
    userId,
    accessToken,
    refreshToken,
  }: SignInPayload) => {
    setUserId(userId);
    setAccessToken(accessToken);
    await SecureStore.setItemAsync('accessToken', accessToken);
    await SecureStore.setItemAsync('refreshToken', refreshToken);
  };

  const signOut = async () => {
    setLoading(true);
    await SecureStore.setItemAsync('accessToken', '');
    await SecureStore.setItemAsync('refreshToken', '');
    setUserId('');
    setAccessToken('');
    setLoading(false);

    await client.clearStore();
  };

  return (
    <AuthContext.Provider
      value={{
        isSignedIn: Boolean(userId),
        userId,
        accessToken,
        signIn,
        signOut,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
