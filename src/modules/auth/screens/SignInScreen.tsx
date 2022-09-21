import React from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Container, Text } from '../../../components';

import { SignInForm } from '../components';

export const SignInScreen: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Container noBottomTab keyboardDismiss>
      <Text type="h2" textCenter mb={2}>
        {t('auth.screens.SignIn.title')}
      </Text>
      <Text textCenter mb={4}>
        {t('auth.screens.SignIn.subtitle')}
      </Text>
      <Box flexGrow={1}>
        <SignInForm />
      </Box>
    </Container>
  );
};
