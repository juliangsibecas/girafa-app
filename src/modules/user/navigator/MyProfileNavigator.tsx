import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import {
  MyProfileScreen,
  PasswordChangeScreen,
  UserAttendedPartiesScreen,
  UserFollowersScreen,
  UserFollowingScreen,
} from '../screens';
import { useTheme } from '../../../theme';
import { SettingsMenuScreen } from '../../settings';

export type MyProfileStackParamList = {
  Profile: undefined;
  UserFollowers: { id: string };
  UserFollowing: { id: string };
  UserAttendedParties: { id: string };

  Settings: undefined;
  PasswordChange: undefined;
  ContactSupport: undefined;
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
      initialRouteName="Profile"
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
        name="Profile"
        component={MyProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="UserFollowers" component={UserFollowersScreen} />
      <Stack.Screen name="UserFollowing" component={UserFollowingScreen} />
      <Stack.Screen
        name="UserAttendedParties"
        component={UserAttendedPartiesScreen}
      />
      <Stack.Screen name="Settings" component={SettingsMenuScreen} />
      <Stack.Screen name="PasswordChange" component={PasswordChangeScreen} />
    </Stack.Navigator>
  );
};
