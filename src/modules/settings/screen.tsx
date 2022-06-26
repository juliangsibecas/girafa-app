import React from 'react';
import { Button, Container } from '../../components';
import { useAuth } from '../auth/hooks';

export const SettingsScreen = () => {
  const { signOut } = useAuth();
  return (
    <Container>
      <Button secondary onPress={signOut}>
        Cerrar sesión
      </Button>
    </Container>
  );
};
