import './yup';
import React from 'react';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { ApolloProvider } from '@apollo/client';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import { useCachedResources } from './hooks/useCachedResources';
import { theme, ThemeMode, ThemeProvider } from './theme';
import { client } from './apollo';
import { AuthProvider } from './modules/auth';
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
          <ThemeProvider theme={theme} mode={ThemeMode.LIGHT}>
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
