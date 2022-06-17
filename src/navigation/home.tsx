import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MapScreen } from '../modules/party';
import { useTheme } from '../theme';
import { PartyDetailScreen } from '../modules/party/screens/PartyDetailScreen';

const Stack = createNativeStackNavigator();

export const HomeNavigator: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
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
