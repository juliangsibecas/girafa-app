import React from 'react';
import { Box, Container, Text } from '../../../components';
import { SignUpForm } from '../components';

export const SignUpScreen: React.FC = () => {
  return (
    <Container noBottomTab>
      <Text type="h2" textCenter mb={2}>
        Bienvenido
      </Text>
      <Text textCenter mb={6}>
        Bienvenido
      </Text>
      <Box flexGrow={1}>
        <SignUpForm />
      </Box>
    </Container>
  );
};
