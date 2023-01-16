import React from 'react';
import { StateHandler } from '../components';
import { useAuth } from '../modules/auth/hooks';
import { OnboardingNavigator } from '../modules/onboarding/navigator';
import { MainNavigator } from './MainNavigator';

export const Navigation = () => {
  const { isSignedIn, isLoading } = useAuth();

  return (
    <StateHandler isLoading={isLoading}>
      {!isSignedIn && <OnboardingNavigator />}
      {isSignedIn && <MainNavigator />}
    </StateHandler>
  );
};

export * from './MainNavigator';
export * from './HomeNavigator';
export * from './linking';
