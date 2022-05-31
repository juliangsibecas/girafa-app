import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Box, Container, Text } from '../../components';
import { Button } from '../../components/Button';
import { OnboardingSlider } from './components';

export const OnboardingScreen: React.FC = () => {
  const { navigate } = useNavigation();
  return (
    <Container noHeader>
      <Text type="h1" textCenter>
        girafa
      </Text>
      <Box flex flexGrow={1}>
        <OnboardingSlider />
      </Box>
      <Box>
        <Button onPress={() => navigate('SignIn')} mb={1}>
          Iniciar sesión
        </Button>
        <Button secondary onPress={() => navigate('SignUp')}>
          Registrarse
        </Button>
      </Box>
    </Container>
  );
};
