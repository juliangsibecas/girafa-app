import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { NavigationProp, RouteProp } from '@react-navigation/native';

import { ChatDirect, ChatDirectNew, ChatHome } from './screens';
import { useTheme } from '../../theme';
import { ChatPreview, UserPreview } from '../../api';

export type ChatStackParamList = {
  ChatHome: undefined;
  ChatDirect: { id?: string; chat?: ChatPreview };
  ChatDirectNew: { user: UserPreview };
};

export type ChatStackRouteProp<T extends keyof ChatStackParamList> = RouteProp<
  ChatStackParamList,
  T
>;
export type ChatStackNavigationProp = NavigationProp<ChatStackParamList>;
export type ChatStackScreenProps<T extends keyof ChatStackParamList> =
  NativeStackScreenProps<ChatStackParamList, T>;

const Stack = createNativeStackNavigator<ChatStackParamList>();

export const ChatNavigator: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="ChatHome"
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
      <Stack.Screen name="ChatHome" component={ChatHome} />
      <Stack.Screen name="ChatDirect" component={ChatDirect} />
      <Stack.Screen name="ChatDirectNew" component={ChatDirectNew} />
    </Stack.Navigator>
  );
};
