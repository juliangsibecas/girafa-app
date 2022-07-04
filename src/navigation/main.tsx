import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '../theme';
import { Icon } from '../components';
import { HomeNavigator, HomeStackParamList } from './home';
import {
  NavigationProp,
  NavigatorScreenParams,
  RouteProp,
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MyProfileNavigator } from './profile';
import { NotificationNavigator } from '../modules/notification';
import { FontFamily } from '../theme/text/types';
import { useNotification } from '../modules/notification/hooks';

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
  const { pendingNotificationsCount } = useNotification();
  const { theme } = useTheme();

  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.palette.background.main,
          borderTopWidth: 0,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.palette.primary.main,
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
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="search" size={2.5} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Notifications"
        component={NotificationNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="bell" size={2.5} color={color} />
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
      />
      <BottomTab.Screen
        name="MyProfile"
        component={MyProfileNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="user" size={2.5} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};
