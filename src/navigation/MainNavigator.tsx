import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '../theme';
import { Icon } from '../components';
import { HomeNavigator, HomeStackParamList } from './HomeNavigator';
import {
  NavigationProp,
  NavigatorScreenParams,
  RouteProp,
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NotificationNavigator } from '../modules/notification';
import { FontFamily } from '../theme/text/types';
import { useNotification } from '../modules/notification/hooks';
import { DiscoverNavigator } from '../modules/discover';
import { MyProfileNavigator } from '../modules/user';
import Toast from 'react-native-toast-message';
import { useFeatureToggle } from '../modules/featureToggle';
import { FeatureToggleName } from '../api';
import { useTranslation } from 'react-i18next';

type MainBottomTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  Discover: undefined;
  Notifications: undefined;
  MyProfile: undefined;
};

export type MainBottomTabRouteProp<T extends keyof MainBottomTabParamList> =
  RouteProp<MainBottomTabParamList, T>;
export type MainBottomTabNavigationProp =
  NavigationProp<MainBottomTabParamList>;
export type MainBottomTabScreenProps<T extends keyof MainBottomTabParamList> =
  NativeStackScreenProps<MainBottomTabParamList, T>;

const BottomTab = createBottomTabNavigator<MainBottomTabParamList>();

export const MainNavigator: React.FC = () => {
  const { t } = useTranslation();
  const { pendingNotificationsCount } = useNotification();
  const { theme } = useTheme();
  const {
    isEnabled: isUserGetEnabled,
    isLoading: isUserGetFeatureFlagLoading,
  } = useFeatureToggle(FeatureToggleName.UserGet);
  const {
    isEnabled: isPartyGetEnabled,
    isLoading: isPartyGetFeatureFlagLoading,
  } = useFeatureToggle(FeatureToggleName.PartyGet);
  const {
    isEnabled: isNotificationGetEnabled,
    isLoading: isNotificationGetFeatureFlagLoading,
  } = useFeatureToggle(FeatureToggleName.NotificationGet);

  const showFeatureFlagToast = () =>
    Toast.show({ type: 'error', text1: t('api.featureToggleDisabled') });

  const isDiscoverDisabled =
    !isUserGetEnabled ||
    isUserGetFeatureFlagLoading ||
    !isPartyGetEnabled ||
    isPartyGetFeatureFlagLoading;

  const isNotificationDisabled =
    !isNotificationGetEnabled || isNotificationGetFeatureFlagLoading;

  const isProfileDisabled = !isUserGetEnabled || isUserGetFeatureFlagLoading;

  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.palette.background.main,
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.palette.primary.main,
        tabBarInactiveTintColor: theme.palette.text.secondary,
        headerShown: false,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="home" size={2.5} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Discover"
        component={DiscoverNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon
              name="search"
              size={2.5}
              color={isDiscoverDisabled ? 'disabled' : color}
            />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            if (isDiscoverDisabled) {
              e.preventDefault();
              showFeatureFlagToast();
            }
          },
        }}
      />
      <BottomTab.Screen
        name="Notifications"
        component={NotificationNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon
              name="bell"
              size={2.5}
              color={isNotificationDisabled ? 'disabled' : color}
            />
          ),
          tabBarBadge:
            pendingNotificationsCount > 0
              ? pendingNotificationsCount
              : undefined,
          tabBarBadgeStyle: {
            height: theme.spacing(2),
            minWidth: theme.spacing(2),
            borderRadius: theme.spacing(1),
            fontFamily: FontFamily.BOLD,
            fontSize: 10,
            lineHeight: 16,
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.background.main,
            marginTop: theme.spacing(0.2),
            paddingHorizontal: 0,
          },
        }}
        listeners={{
          tabPress: (e) => {
            if (isNotificationDisabled) {
              e.preventDefault();
              showFeatureFlagToast();
            }
          },
        }}
      />
      <BottomTab.Screen
        name="MyProfile"
        component={MyProfileNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon
              name="user"
              size={2.5}
              color={isProfileDisabled ? 'disabled' : color}
            />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            if (isProfileDisabled) {
              e.preventDefault();
              showFeatureFlagToast();
            }
          },
        }}
      />
    </BottomTab.Navigator>
  );
};
