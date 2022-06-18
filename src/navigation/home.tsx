import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { MapScreen } from '../modules/party';
import { useTheme } from '../theme';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { PartyDetailScreen } from '../modules/party/screens/PartyDetailScreen';
import { PartyAttendersScreen } from '../modules/party/screens/PartyAttendersScreen';

export type HomeStackParamList = {
  Map: undefined;
  PartyDetail: { id: string };
  PartyAttenders: { id: string };
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
      <Stack.Screen name="PartyDetail" component={PartyDetailScreen} />
      <Stack.Screen name="PartyAttenders" component={PartyAttendersScreen} />
    </Stack.Navigator>
  );
};
