import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { NavigationProp, RouteProp } from '@react-navigation/native';

import {
  CoreStackGroup,
  CoreStackGroupParamList,
} from '../../../navigation/CoreStackGroup';
import { useTheme } from '../../../theme';

import { SettingsNavigator } from '../../settings/navigator';

import { MyProfileScreen, UserEditScreen } from '../screens';
import { UserGetResponse } from '../../../api';

export type MyProfileStackParamList = CoreStackGroupParamList & {
  Me: undefined;
  UserEdit: UserGetResponse;
  Settings: undefined;
};

export type MyProfileStackRouteProp<T extends keyof MyProfileStackParamList> =
  RouteProp<MyProfileStackParamList, T>;
export type MyProfileStackNavigationProp =
  NavigationProp<MyProfileStackParamList>;
export type MyProfileStackScreenProps<T extends keyof MyProfileStackParamList> =
  NativeStackScreenProps<MyProfileStackParamList, T>;

const Stack = createNativeStackNavigator<MyProfileStackParamList>();

export const MyProfileNavigator: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="Me"
      screenOptions={{
        headerTitle: '',
        headerBackTitle: '',
        headerShadowVisible: false,
        headerTintColor: theme.palette.primary.main,
        headerStyle: {
          backgroundColor: theme.palette.background.main,
        },
        contentStyle: {
          backgroundColor: theme.palette.background.main,
        },
      }}
    >
      <Stack.Screen
        name="Me"
        component={MyProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="UserEdit" component={UserEditScreen} />
      <Stack.Screen name="Settings" component={SettingsNavigator} />
      {CoreStackGroup({ Stack })}
    </Stack.Navigator>
  );
};
