import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { useTheme } from '../../theme';
import { NotificationsScreen } from './screens';
import { ProfileStackGroup } from '../user';
import { PartyDetailStackGroup } from '../party';

export type NotificationStackParamList = {
  List: undefined;
  UserProfile: { id: string };
  PartyDetail: { id: string };
};

export type NotificationStackRouteProp<
  T extends keyof NotificationStackParamList
> = RouteProp<NotificationStackParamList, T>;
export type NotificationStackNavigationProp =
  NavigationProp<NotificationStackParamList>;
export type NotificationStackScreenProps<
  T extends keyof NotificationStackParamList
> = NativeStackScreenProps<NotificationStackParamList, T>;

const Stack = createNativeStackNavigator<NotificationStackParamList>();

export const NotificationNavigator: React.FC = () => {
  const { theme } = useTheme();
  return (
    <Stack.Navigator
      initialRouteName="List"
      screenOptions={{
        headerTitle: '',
        headerBackTitle: '',
        headerShadowVisible: false,
        headerTintColor: theme.palette.primary.main,
      }}
    >
      <Stack.Screen
        name="List"
        component={NotificationsScreen}
        options={{
          headerStyle: {
            backgroundColor: theme.palette.background.main,
          },
        }}
      />
      {ProfileStackGroup({ Stack })}
      {PartyDetailStackGroup({ Stack })}
    </Stack.Navigator>
  );
};
