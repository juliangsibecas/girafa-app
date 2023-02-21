import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { NavigationProp, RouteProp } from '@react-navigation/native';

import { SupportScreen } from '../support';
import { PasswordChangeScreen, UserDeleteScreen } from '../user/screens';
import { AppearanceScreen, SettingsMenuScreen } from './screens';
import { TermsScreen } from '../legal';

export type SettingsStackParamList = {
  Menu: undefined;
  PasswordChange: undefined;
  Support: undefined;
  UserDelete: undefined;
  Terms: undefined;
  Appearance: undefined;
};

export type SettingsStackRouteProp<T extends keyof SettingsStackParamList> =
  RouteProp<SettingsStackParamList, T>;
export type SettingsStackNavigationProp =
  NavigationProp<SettingsStackParamList>;
export type SettingsStackScreenProps<T extends keyof SettingsStackParamList> =
  NativeStackScreenProps<SettingsStackParamList, T>;

const Stack = createNativeStackNavigator<SettingsStackParamList>();

export const SettingsNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Menu"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Menu" component={SettingsMenuScreen} />
      <Stack.Screen name="PasswordChange" component={PasswordChangeScreen} />
      <Stack.Screen name="Support" component={SupportScreen} />
      <Stack.Screen name="UserDelete" component={UserDeleteScreen} />
      <Stack.Screen name="Terms" component={TermsScreen} />
      <Stack.Screen name="Appearance" component={AppearanceScreen} />
    </Stack.Navigator>
  );
};
