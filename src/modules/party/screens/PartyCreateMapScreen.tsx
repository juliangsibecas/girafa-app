import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Coordinate } from '../../../api';
import { Box, Button, Container, Map, Marker, Text } from '../../../components';
import { HomeStackScreenProps } from '../../../navigation';

export const PartyCreateMapScreen: React.FC = () => {
  const { navigate } =
    useNavigation<HomeStackScreenProps<'PartyCreateMap'>['navigation']>();
  const [coordinate, setCoordinate] = useState<Coordinate>();

  return (
    <>
      <Box position="absolute">
        <Map
          markers={coordinate ? [{ coordinate }] : []}
          onPress={(e) => setCoordinate(e.nativeEvent.coordinate)}
        />
      </Box>
      <Container noHeader bgColor={undefined} pointerEvents="box-none">
        <Box flexGrow={1} pointerEvents="box-none">
          <Text type="h3" textCenter>
            Selecciona ubicacion
          </Text>
          <Text type="hint" textCenter mt={1}>
            Solo dentro de Gran La Plata
          </Text>
        </Box>
        <Button
          onPress={() => navigate('PartyCreateForm', { coordinate })}
          isDisabled={!Boolean(coordinate)}
          mb={4}
        >
          Continuar
        </Button>
      </Container>
    </>
  );
};
