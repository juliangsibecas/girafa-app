import './yup';
import './date';
import './i18n';

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
import { Appearance } from 'react-native';
import { NotificationsProvider } from './modules/notification';

const AppComponent = () => {
  const isLightTheme = Appearance.getColorScheme() === 'light';
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <StatusBar style={isLightTheme ? 'dark' : 'light'} />
        <ApolloProvider client={client}>
          <ThemeProvider
            theme={theme}
            mode={isLightTheme ? ThemeMode.LIGHT : ThemeMode.DARK}
          >
            <AuthProvider>
              <NotificationsProvider>
                <Navigation />
                <Toast position="bottom" />
              </NotificationsProvider>
            </AuthProvider>
          </ThemeProvider>
        </ApolloProvider>
      </SafeAreaProvider>
    );
  }
};

export const App = registerRootComponent(AppComponent);
