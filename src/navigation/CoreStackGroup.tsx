import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { NavigationProp, RouteProp } from '@react-navigation/native';

import {
  ProfileStackGroup,
  ProfileStackGroupParamList,
} from '../modules/user/navigator/ProfileStackGroup';
import {
  PartyDetailStackGroup,
  PartyDetailStackGroupParamList,
} from '../modules/party/navigator';
import { useTheme } from '../theme';

export type CoreStackGroupParamList = ProfileStackGroupParamList &
  PartyDetailStackGroupParamList;

export type CoreStackGroupRouteProp<T extends keyof CoreStackGroupParamList> =
  RouteProp<CoreStackGroupParamList, T>;
export type CoreStackGroupNavigationProp =
  NavigationProp<CoreStackGroupParamList>;
export type CoreStackGroupScreenProps<T extends keyof CoreStackGroupParamList> =
  NativeStackScreenProps<CoreStackGroupParamList, T>;

interface ICoreStackGroup {
  Stack: ReturnType<typeof createNativeStackNavigator<any>>;
}

export const CoreStackGroup: React.FC<ICoreStackGroup> = ({ Stack }) => {
  const { theme } = useTheme();

  return (
    <Stack.Group
      screenOptions={{
        headerTransparent: true,
        contentStyle: {
          backgroundColor: theme.palette.background.main,
        },
      }}
    >
      {ProfileStackGroup({ Stack })}
      {PartyDetailStackGroup({ Stack })}
    </Stack.Group>
  );
};
