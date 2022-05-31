import { useState } from 'react';
import { AuthContext } from './context';
import * as SecureStore from 'expo-secure-store';
import { SignInPayload } from './types';

export const AuthProvider: React.FC = ({ children }) => {
  const [userId, setUserId] = useState('');

  const signIn = async ({
    userId,
    accessToken,
    refreshToken,
  }: SignInPayload) => {
    setUserId(userId);
    SecureStore.setItemAsync('accessToken', accessToken);
    SecureStore.setItemAsync('refreshToken', refreshToken);
  };

  const signOut = () => {
    setUserId('');
  };

  return (
    <AuthContext.Provider
      value={{ isSignedIn: Boolean(userId), userId, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
