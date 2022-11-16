import React from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Container, Header } from '../../../components';

import { SignUpForm } from '../components';

export const SignUpScreen: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Container noBottomTab keyboard>
      <Header
        title={t('auth.screens.SignUp.title')}
        subtitle={t('auth.screens.SignUp.subtitle')}
      />
      <Box flexGrow={1}>
        <SignUpForm />
      </Box>
    </Container>
  );
};
