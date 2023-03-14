import React from 'react';
import { nativeApplicationVersion } from 'expo-application';

import { useAppInfoMeetMinVersionQuery } from '../api';
import { StateHandler } from '../components';
import { useAuth } from '../modules/auth/hooks';
import { OnboardingNavigator } from '../modules/onboarding/navigator';
import { ForceUpdateScreen } from '../modules/maintenance';
import { NotificationsProvider } from '../modules/notification';
import { ChatProvider } from '../modules/chat';

import { MainNavigator } from './MainNavigator';

export const Navigation = () => {
  const { data, loading: isVersionCheckLoading } =
    useAppInfoMeetMinVersionQuery({
      variables: { version: nativeApplicationVersion ?? '0.0.0' },
    });
  const { isSignedIn, isLoading } = useAuth();

  const forceUpdate = !data?.appInfoMeetMinVersion;

  return (
    <StateHandler isLoading={isLoading || isVersionCheckLoading}>
      {forceUpdate ? (
        <ForceUpdateScreen />
      ) : isSignedIn ? (
        <NotificationsProvider>
          <ChatProvider>
            <MainNavigator />
          </ChatProvider>
        </NotificationsProvider>
      ) : (
        <OnboardingNavigator />
      )}
    </StateHandler>
  );
};

export * from './MainNavigator';
export * from './HomeNavigator';
export * from './linking';
