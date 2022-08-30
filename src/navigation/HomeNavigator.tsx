import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {
  MapScreen,
  PartyCreateMapScreen,
  PartyCreateFormScreen,
  PartyDetailStackGroup,
} from '../modules/party';
import { useTheme } from '../theme';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { ProfileStackGroup } from '../modules/user';
import { Coordinate } from '../api';

export type HomeStackParamList = {
  Map: undefined;
  PartyCreateForm: { coordinate: Coordinate } | undefined;
  PartyCreateMap: undefined;
  PartyDetail: { id: string };
  PartyAttenders: { id: string };
  UserProfile: { id: string };
  UserFollowers: { id: string };
  UserFollowing: { id: string };
  UserAttendedParties: { id: string };
};

export type HomeStackRouteProp<T extends keyof HomeStackParamList> = RouteProp<
  HomeStackParamList,
  T
>;
export type HomeStackNavigationProp = NavigationProp<HomeStackParamList>;
export type HomeStackScreenProps<T extends keyof HomeStackParamList> =
  NativeStackScreenProps<HomeStackParamList, T>;

const Stack = createNativeStackNavigator<HomeStackParamList>();

export const HomeNavigator: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="Map"
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
        name="Map"
        component={MapScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="PartyCreateForm" component={PartyCreateFormScreen} />
      <Stack.Screen
        name="PartyCreateMap"
        component={PartyCreateMapScreen}
        options={{ headerTransparent: true, headerStyle: {} }}
      />
      {ProfileStackGroup({ Stack })}
      {PartyDetailStackGroup({ Stack })}
    </Stack.Navigator>
  );
};
