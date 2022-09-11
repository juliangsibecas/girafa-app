import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Container, Text } from '../../../components';
import { SignUpForm } from '../components';

export const SignUpScreen: React.FC = () => {
  const {t} = useTranslation()
  return (
    <Container noBottomTab>
      <Text type="h2" textCenter mb={2}>
        {t('auth.screens.SignUp.title')}
      </Text>
      <Text textCenter mb={6}>
        {t('auth.screens.SignUp.subtitle')}
      </Text>
      <Box flexGrow={1}>
        <SignUpForm />
      </Box>
    </Container>
  );
};
