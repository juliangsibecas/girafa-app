import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Box, Container, Logo } from '../../components';
import { Button } from '../../components/Button';
import { OnboardingSlider } from './components';

export const OnboardingScreen: React.FC = () => {
  const { navigate } = useNavigation();
  return (
    <Container noHeader noBottomTab>
      <Box center>
        <Logo />
      </Box>
      <Box flex flexGrow={1} vcenter>
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
