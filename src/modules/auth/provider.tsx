import { useEffect, useState } from 'react';
import { AuthContext } from './context';
import * as SecureStore from 'expo-secure-store';
import { SignInPayload } from './types';
import jwtDecode from 'jwt-decode';
import { useSignInFromRefreshTokenMutation } from '../../api';

export const AuthProvider: React.FC = ({ children }) => {
  const [signinFromRefreshToken] = useSignInFromRefreshTokenMutation();
  const [userId, setUserId] = useState('');
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fn = async () => {
      const accessToken = await SecureStore.getItemAsync('accessToken');
      const refreshToken = await SecureStore.getItemAsync('refreshToken');

      if (accessToken) {
        const { userId, exp } = jwtDecode<{ userId: string; exp: number }>(
          accessToken
        );

        if (Date.now() < exp * 1000) {
          setUserId(userId);
          setLoading(false);
          return;
        }
      }

      if (refreshToken) {
        try {
          const res = await signinFromRefreshToken({
            context: {
              headers: {
                Refresh: refreshToken,
              },
            },
          });

          const data = res.data!.signInFromRefreshToken;

          await SecureStore.setItemAsync('accessToken', data.accessToken);
          await SecureStore.setItemAsync('refreshToken', data.refreshToken);
          setUserId(data.userId);
          setLoading(false);
        } catch (e) {
          console.log(e);
        }
      }

      console.log('aoeu');
    };

    fn();
  }, []);

  const signIn = async ({
    userId,
    accessToken,
    refreshToken,
  }: SignInPayload) => {
    setUserId(userId);
    await SecureStore.setItemAsync('accessToken', accessToken);
    await SecureStore.setItemAsync('refreshToken', refreshToken);
  };

  const signOut = async () => {
    setUserId('');
    await SecureStore.setItemAsync('accessToken', '');
    await SecureStore.setItemAsync('refreshToken', '');
  };

  return (
    <AuthContext.Provider
      value={{
        isSignedIn: Boolean(userId),
        userId,
        signIn,
        signOut,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
