import React from 'react';
import { nativeApplicationVersion } from 'expo-application';
import { useNavigation } from '@react-navigation/native';
import { FlatList, TouchableOpacity } from 'react-native';

import { Box, Button, Container, Icon, Text } from '../../../components';
import { FontFamily } from '../../../theme';

import { useAuth } from '../../auth';
import { MyProfileStackParamList, MyProfileStackScreenProps } from '../../user';

export const SettingsMenuScreen = () => {
  const { navigate } =
    useNavigation<MyProfileStackScreenProps<'Settings'>['navigation']>();
  const { signOut } = useAuth();

  const options: Array<{ label: string; to: keyof MyProfileStackParamList }> = [
    {
      label: 'Cambiar clave',
      to: 'PasswordChange',
    },
    {
      label: 'Contactar soporte',
      to: 'ContactSupport',
    },
  ];

  return (
    <Container noBottomGradient>
      <Box flexGrow={1}>
        <FlatList
          data={options}
          renderItem={({ item, index }) => (
            <TouchableOpacity key={index} onPress={() => navigate(item.to)}>
              <Box flex row py={2}>
                <Text flexGrow={1}>{item.label}</Text>
                <Icon name="chevron-right" />
              </Box>
            </TouchableOpacity>
          )}
        />
      </Box>
      <Button secondary onPress={signOut}>
        Cerrar sesión
      </Button>
      <Text
        type="secondary"
        fontFamily={FontFamily.SEMIBOLD}
        fontSize={12}
        textCenter
        mt={1}
      >
        Version: {nativeApplicationVersion}
      </Text>
    </Container>
  );
};
