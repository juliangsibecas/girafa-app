import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '../theme';
import { MapScreen } from '../modules/party';
import Icon from 'react-native-vector-icons/FontAwesome5';

const BottomTab = createBottomTabNavigator();

export const MainNavigator: React.FC = () => {
  const { theme } = useTheme();
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerTitle: '',
        headerShadowVisible: false,
        headerTintColor: theme.palette.primary.main,
        headerStyle: {
          backgroundColor: theme.palette.background.main,
        },
        tabBarStyle: {
          backgroundColor: theme.palette.background.main,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.palette.primary.main,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={MapScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};
