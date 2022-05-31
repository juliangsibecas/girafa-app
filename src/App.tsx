import './yup';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import { useCachedResources } from './hooks/useCachedResources';
import { ThemeProvider } from './theme';
import { ApolloProvider } from '@apollo/client';
import { client } from './apollo';
import { AuthProvider } from './modules/auth/provider';
import { Navigation } from './navigation';

const AppComponent = () => {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <StatusBar />
        <ApolloProvider client={client}>
          <ThemeProvider>
            <AuthProvider>
              <Navigation />
              <Toast position="bottom" />
            </AuthProvider>
          </ThemeProvider>
        </ApolloProvider>
      </SafeAreaProvider>
    );
  }
};

export const App = registerRootComponent(AppComponent);
