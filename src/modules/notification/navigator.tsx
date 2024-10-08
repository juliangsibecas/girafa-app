import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { useTheme } from '../../theme';
import { NotificationsScreen } from './screens';
import {
  CoreStackGroup,
  CoreStackGroupParamList,
} from '../../navigation/CoreStackGroup';

export type NotificationStackParamList = CoreStackGroupParamList & {
  List: undefined;
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
        headerTransparent: true,
        headerStyle: {},
        contentStyle: {
          backgroundColor: theme.palette.background.main,
        },
      }}
    >
      <Stack.Screen name="List" component={NotificationsScreen} />
      {CoreStackGroup({ Stack })}
    </Stack.Navigator>
  );
};
