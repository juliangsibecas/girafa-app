import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { useTheme } from '../../theme';
import { DiscoverScreen } from './screens';
import { UserProfileScreen } from '../user';
import { PartyDetailScreen } from '../party';
import { UserPreview } from '../../api';

export type DiscoverStackParamList = {
  List: undefined;
  UserList: { users: Array<UserPreview>; q: string };
  PartyList: { q: string };
  UserProfile: { id: string };
  PartyDetail: { id: string };
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
      <Stack.Screen name="List" component={DiscoverScreen} />
      <Stack.Screen name="UserProfile" component={UserProfileScreen} />
      <Stack.Screen name="PartyDetail" component={PartyDetailScreen} />
    </Stack.Navigator>
  );
};
