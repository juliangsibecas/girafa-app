import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import {
  CodeGenerationScreen,
  PasswordResetScreen,
  SignInScreen,
  SignUpScreen,
} from '../auth';
import { OnboardingScreen } from './screen';
import { useTheme } from '../../theme';
import { TermsScreen } from '../legal';

export type OnboardingStackParamList = {
  Onboarding: undefined;
  SignUp: undefined;
  SignIn: undefined;
  CodeGeneration: { email?: string };
  PasswordRecovery: { email: string };
  Terms: undefined;
};

export type OnboardingRouteProp<T extends keyof OnboardingStackParamList> =
  RouteProp<OnboardingStackParamList, T>;
export type OnboardingNavigationProp<T extends keyof OnboardingStackParamList> =
  NavigationProp<OnboardingStackParamList, T>;

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
        contentStyle: {
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
      <Stack.Screen name="CodeGeneration" component={CodeGenerationScreen} />
      <Stack.Screen name="PasswordRecovery" component={PasswordResetScreen} />
      <Stack.Screen name="Terms" component={TermsScreen} />
    </Stack.Navigator>
  );
};
