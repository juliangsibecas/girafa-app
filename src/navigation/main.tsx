import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '../theme';
import { MapScreen } from '../modules/party';
import { Icon } from '../components';
import { HomeNavigator } from './home';

const BottomTab = createBottomTabNavigator();

export const MainNavigator: React.FC = () => {
  const { theme } = useTheme();
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.palette.background.main,
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
            <Icon name="home" size={3} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};
