import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { NavigationProp, RouteProp } from '@react-navigation/native';

import { useTheme } from '../../theme';
import { SupportScreen } from '../support';
import { PasswordChangeScreen, UserDeleteScreen } from '../user/screens';
import { SettingsMenuScreen } from './screens';

export type SettingsStackParamList = {
  Menu: undefined;
  PasswordChange: undefined;
  Support: undefined;
  UserDelete: undefined;
};

export type SettingsStackRouteProp<T extends keyof SettingsStackParamList> =
  RouteProp<SettingsStackParamList, T>;
export type SettingsStackNavigationProp =
  NavigationProp<SettingsStackParamList>;
export type SettingsStackScreenProps<T extends keyof SettingsStackParamList> =
  NativeStackScreenProps<SettingsStackParamList, T>;

const Stack = createNativeStackNavigator<SettingsStackParamList>();

export const SettingsNavigator: React.FC = () => {
  const { theme } = useTheme();
  return (
    <Stack.Navigator
      initialRouteName="Menu"
      screenOptions={{
        headerTitle: '',
        headerBackTitle: '',
        headerShadowVisible: false,
        headerTintColor: theme.palette.primary.main,
        headerStyle: {
          backgroundColor: theme.palette.background.main,
        },
      }}
    >
      <Stack.Screen name="Menu" component={SettingsMenuScreen} />
      <Stack.Screen name="PasswordChange" component={PasswordChangeScreen} />
      <Stack.Screen name="Support" component={SupportScreen} />
      <Stack.Screen name="UserDelete" component={UserDeleteScreen} />
    </Stack.Navigator>
  );
};
