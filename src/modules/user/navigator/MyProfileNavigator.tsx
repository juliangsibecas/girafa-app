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

import {
  MyProfileScreen,
  PasswordChangeScreen,
  UserEditScreen,
} from '../screens';
import { useTheme } from '../../../theme';
import { SettingsMenuScreen } from '../../settings';
import { SupportScreen } from '../../support';

export type MyProfileStackParamList = CoreStackGroupParamList & {
  Me: undefined;
  UserEdit: { fullname: string; nickname: string };

  Settings: undefined;
  PasswordChange: undefined;
  Support: undefined;
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
      }}
    >
      <Stack.Screen
        name="Me"
        component={MyProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="UserEdit" component={UserEditScreen} />
      <Stack.Screen name="Settings" component={SettingsMenuScreen} />
      <Stack.Screen name="PasswordChange" component={PasswordChangeScreen} />
      <Stack.Screen name="Support" component={SupportScreen} />
      {CoreStackGroup({ Stack })}
    </Stack.Navigator>
  );
};
