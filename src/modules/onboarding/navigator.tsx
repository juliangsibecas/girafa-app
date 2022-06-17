import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignUpScreen } from '../auth';
import { OnboardingScreen } from './screen';
import { SignInScreen } from '../auth/screens/SignInScreen';
import { useTheme } from '../../theme';
import { NavigationProp } from '@react-navigation/native';

export type OnboardingStackParamList = {
  Onboarding: undefined;
  SignUp: undefined;
  SignIn: undefined;
};

export type OnboardingNavigationProp = NavigationProp<OnboardingStackParamList>;

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export const OnboardingNavigator: React.FC = () => {
  const { theme } = useTheme();
  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
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
        name="Onboarding"
        component={OnboardingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
    </Stack.Navigator>
  );
};
