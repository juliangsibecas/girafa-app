import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Text } from '../components';
import { useAuth } from '../modules/auth/hooks';
import { OnboardingNavigator } from '../modules/onboarding/navigator';

export const Navigation = () => {
  const { isSignedIn } = useAuth();

  return (
    <NavigationContainer>
      {!isSignedIn && <OnboardingNavigator />}
      {isSignedIn && <Text>hola</Text>}
    </NavigationContainer>
  );
};
