import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Container, Logo } from '../../components';
import { Button } from '../../components/Button';
import { OnboardingSlider } from './components';
import { OnboardingNavigationProp } from './navigator';

export const OnboardingScreen: React.FC = () => {
  const { t } = useTranslation();
  const { navigate } = useNavigation<OnboardingNavigationProp<'Onboarding'>>();

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
          {t('onboarding.screens.Onboarding.signIn')}
        </Button>
        <Button secondary onPress={() => navigate('SignUp')}>
          {t('onboarding.screens.Onboarding.signUp')}
        </Button>
      </Box>
    </Container>
  );
};
