import React from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Container, Header } from '../../../components';

import { SignInForm } from '../components';

export const SignInScreen: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Container noBottomTab keyboard>
      <Header
        title={t('auth.screens.SignIn.title')}
        subtitle={t('auth.screens.SignIn.subtitle')}
      />
      <Box flexGrow={1}>
        <SignInForm />
      </Box>
    </Container>
  );
};
