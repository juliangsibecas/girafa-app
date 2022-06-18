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

type MainBottomTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  Discover: undefined;
  Notifications: undefined;
  Profile: undefined;
};

export type MainBottomTabRouteProp<T extends keyof MainBottomTabParamList> =
  RouteProp<MainBottomTabParamList, T>;
export type MainBottomTabNavigationProp =
  NavigationProp<MainBottomTabParamList>;
export type MainBottomTabScreenProps<T extends keyof MainBottomTabParamList> =
  NativeStackScreenProps<MainBottomTabParamList, T>;

const BottomTab = createBottomTabNavigator<MainBottomTabParamList>();

export const MainNavigator: React.FC = () => {
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
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name="home" size={2.5} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Discover"
        component={HomeNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name="search" size={2.5} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Notifications"
        component={HomeNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name="bell" size={2.5} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={HomeNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name="user" size={2.5} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};
