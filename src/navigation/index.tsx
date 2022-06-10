import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StateHandler } from '../components';
import { useAuth } from '../modules/auth/hooks';
import { OnboardingNavigator } from '../modules/onboarding/navigator';
import { MainNavigator } from './main';

export const Navigation = () => {
  const { isSignedIn, isLoading } = useAuth();

  return (
    <StateHandler isLoading={isLoading}>
      <NavigationContainer>
        {!isSignedIn && <OnboardingNavigator />}
        {isSignedIn && <MainNavigator />}
      </NavigationContainer>
    </StateHandler>
  );
};
