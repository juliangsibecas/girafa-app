import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { useTheme } from '../../theme';
import { DiscoverScreen } from './screens';
import {
  CoreStackGroup,
  CoreStackGroupParamList,
} from '../../navigation/CoreStackGroup';

export type DiscoverStackParamList = CoreStackGroupParamList & {
  List: undefined;
};

export type DiscoverStackRouteProp<T extends keyof DiscoverStackParamList> =
  RouteProp<DiscoverStackParamList, T>;
export type DiscoverStackNavigationProp =
  NavigationProp<DiscoverStackParamList>;
export type DiscoverStackScreenProps<T extends keyof DiscoverStackParamList> =
  NativeStackScreenProps<DiscoverStackParamList, T>;

const Stack = createNativeStackNavigator<DiscoverStackParamList>();

export const DiscoverNavigator: React.FC = () => {
  const { theme } = useTheme();
  return (
    <Stack.Navigator
      initialRouteName="List"
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
        name="List"
        component={DiscoverScreen}
        options={{ headerTransparent: true }}
      />
      {CoreStackGroup({ Stack })}
    </Stack.Navigator>
  );
};
