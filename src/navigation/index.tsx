import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StateHandler, Text } from '../components';
import { useAuth } from '../modules/auth/hooks';
import { OnboardingNavigator } from '../modules/onboarding/navigator';

export const Navigation = () => {
  const { isSignedIn, isLoading } = useAuth();

  return (
    <StateHandler isLoading={isLoading}>
      <NavigationContainer>
        {!isSignedIn && <OnboardingNavigator />}
        {isSignedIn && <Text>hola</Text>}
      </NavigationContainer>
    </StateHandler>
  );
};
