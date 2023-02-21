import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {
  MapScreen,
  PartyCreateMapScreen,
  PartyCreateFormScreen,
} from '../modules/party';
import { useTheme } from '../theme';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { Coordinate } from '../api';
import { CoreStackGroup, CoreStackGroupParamList } from './CoreStackGroup';

export type HomeStackParamList = CoreStackGroupParamList & {
  Map: undefined;
  PartyCreateForm: { coordinate: Coordinate } | undefined;
  PartyCreateMap: undefined;
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
        contentStyle: {
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
      {CoreStackGroup({ Stack })}
    </Stack.Navigator>
  );
};
