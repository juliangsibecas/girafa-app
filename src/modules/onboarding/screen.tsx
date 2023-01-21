import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FeatureToggleName } from '../../api';
import { Box, Container, FeatureToggledButton, Icon } from '../../components';
import { Button } from '../../components/Button';
import { OnboardingSlider } from './components';
import { OnboardingNavigationProp } from './navigator';

export const OnboardingScreen: React.FC = () => {
  const { t } = useTranslation();
  const { navigate } = useNavigation<OnboardingNavigationProp<'Onboarding'>>();

  const handleSignInPress = () => navigate('SignIn');
  const handleSignUpPress = () => navigate('SignUp');

  return (
    <Container noHeader noBottomTab>
      <Box center>
        <Icon name="logo" color="primary" isFilled size={6} />
      </Box>
      <Box flex={1} vcenter>
        <OnboardingSlider />
      </Box>
      <Box>
        <Button onPress={handleSignInPress} mb={1}>
          {t('onboarding.screens.Onboarding.signIn')}
        </Button>
        <FeatureToggledButton
          secondary
          ft={FeatureToggleName.SignUp}
          onPress={handleSignUpPress}
        >
          {t('onboarding.screens.Onboarding.signUp')}
        </FeatureToggledButton>
      </Box>
    </Container>
  );
};
