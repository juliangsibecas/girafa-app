import './yup';
import './date';
import './i18n';

import React from 'react';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { ApolloProvider } from '@apollo/client';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import { useCachedResources } from './hooks';
import { theme, ThemeMode, ThemeProvider } from './theme';
import { client } from './apollo';
import { NotificationsProvider } from './modules/notification';
import { AuthProvider } from './modules/auth';
import { Navigation } from './navigation';
import { useThemeMode } from './theme';
import { linking } from './navigation';
import { ChatProvider } from './modules/chat';

const AppComponent = () => {
  const isResourcesLoading = useCachedResources();
  const { isThemeModeLoading, themeMode } = useThemeMode();

  const isLoading = isResourcesLoading || isThemeModeLoading;

  if (isLoading) {
    return null;
  } else {
    return (
      <SafeAreaProvider
        style={{ backgroundColor: theme(themeMode).palette.background.main }}
      >
        <StatusBar style={themeMode === ThemeMode.LIGHT ? 'dark' : 'light'} />
        <ApolloProvider client={client}>
          <ThemeProvider theme={theme} mode={themeMode}>
            <NavigationContainer linking={linking}>
              <AuthProvider>
                <NotificationsProvider>
                  <ChatProvider>
                    <Navigation />
                    <Toast position="bottom" />
                  </ChatProvider>
                </NotificationsProvider>
              </AuthProvider>
            </NavigationContainer>
          </ThemeProvider>
        </ApolloProvider>
      </SafeAreaProvider>
    );
  }
};

export const App = registerRootComponent(AppComponent);
