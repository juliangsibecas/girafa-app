import * as Linking from 'expo-linking';
import { LinkingOptions, NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StateHandler } from '../components';
import { useAuth } from '../modules/auth/hooks';
import { OnboardingNavigator } from '../modules/onboarding/navigator';
import { MainNavigator } from './main';

const prefix = Linking.createURL('/');

export const Navigation = () => {
  const { isSignedIn, isLoading } = useAuth();

  const linking: LinkingOptions<any> = {
    prefixes: [prefix],
    config: {
      screens: {
        Home: {
          screens: {
            PartyDetail: 'party/:id',
          },
        },
      },
    },
  };

  return (
    <StateHandler isLoading={isLoading}>
      <NavigationContainer linking={linking}>
        {!isSignedIn && <OnboardingNavigator />}
        {isSignedIn && <MainNavigator />}
      </NavigationContainer>
    </StateHandler>
  );
};

export * from './main';
export * from './home';
