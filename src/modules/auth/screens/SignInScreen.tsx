import React from 'react';
import { Box, Container, Text } from '../../../components';
import { SignInForm } from '../components';

export const SignInScreen: React.FC = () => {
  return (
    <Container noBottomTab>
      <Text type="h2" textCenter mb={2}>
        Holanda
      </Text>
      <Text textCenter mb={2}>
        Holanda
      </Text>
      <Box mt={4} flexGrow={1}>
        <SignInForm />
      </Box>
    </Container>
  );
};
