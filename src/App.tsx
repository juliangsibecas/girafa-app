import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text } from './components/Text';

import { useCachedResources } from './hooks/useCachedResources';
import { ThemeProvider } from './theme';

const AppComponent = () => {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <StatusBar />
        <ThemeProvider>
          <Text type="h1" m={50}>
            hola
          </Text>
        </ThemeProvider>
      </SafeAreaProvider>
    );
  }
};

export const App = registerRootComponent(AppComponent);
