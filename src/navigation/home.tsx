import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MapScreen } from '../modules/party';
import { useTheme } from '../theme';
import { PartyDetailScreen } from '../modules/party/screens/PartyDetailScreen';
import { NavigationProp, RouteProp } from '@react-navigation/native';

export type HomeStackParamList = {
  Map: undefined;
  PartyDetail: { id: string };
};

export type HomeRouteProp<T extends keyof HomeStackParamList> = RouteProp<
  HomeStackParamList,
  T
>;
export type HomeNavigationProp = NavigationProp<HomeStackParamList>;

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
    </Stack.Navigator>
  );
};
