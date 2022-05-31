import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignUpScreen } from '../auth';
import { OnboardingScreen } from './screen';
import { SignInScreen } from '../auth/screens/SignInScreen';

const Stack = createNativeStackNavigator();

export const OnboardingNavigator: React.FC = () => (
  <Stack.Navigator
    screenOptions={{
      headerTitle: '',
      headerBackTitle: '',
      headerShadowVisible: false,
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
