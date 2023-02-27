import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { NavigationProp, RouteProp } from '@react-navigation/native';

import { useTheme } from '../../../theme';
import { ChatPreview, UserPreview } from '../../../api';

import { ChatDirectScreen, ChatHomeScreen } from '../screens';
import {
  CoreStackGroup,
  CoreStackGroupParamList,
} from '../../../navigation/CoreStackGroup';

export type ChatStackParamList = CoreStackGroupParamList & {
  ChatHome: undefined;
  ChatDirect: {
    id?: string;
    chat?: ChatPreview;
    user?: UserPreview;
    isFromProfile?: boolean;
  };
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
        headerTransparent: true,
        contentStyle: {
          backgroundColor: theme.palette.background.main,
        },
      }}
    >
      <Stack.Screen name="ChatHome" component={ChatHomeScreen} />
      <Stack.Screen name="ChatDirect" component={ChatDirectScreen} />
      {CoreStackGroup({ Stack })}
    </Stack.Navigator>
  );
};
