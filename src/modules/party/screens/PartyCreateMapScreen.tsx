import React, { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { Coordinate } from '../../../api';
import { Box, Button, Container, Map, Text } from '../../../components';
import { HomeStackScreenProps } from '../../../navigation';
import { useTranslation } from 'react-i18next';
import MapView from 'react-native-maps';

export const PartyCreateMapScreen: React.FC = () => {
  const { t } = useTranslation();
  const { navigate } =
    useNavigation<HomeStackScreenProps<'PartyCreateMap'>['navigation']>();
  const [coordinate, setCoordinate] = useState<Coordinate>();
  const map = useRef<MapView>();

  return (
    <>
      <Box position="absolute">
        <Map
          mapRef={map}
          markers={coordinate ? [{ coordinate }] : []}
          onPress={(e) => setCoordinate(e.nativeEvent.coordinate)}
        />
      </Box>
      <Container noHeader bgColor={undefined} pointerEvents="box-none">
        <Box flexGrow={1} pointerEvents="box-none">
          <Text type="h3" textCenter>
            {t('party.screens.CreateMap.title')}
          </Text>
          <Text type="hint" textCenter mt={1}>
            {t('party.screens.CreateMap.hint')}
          </Text>
        </Box>
        <Button
          onPress={() =>
            navigate('PartyCreateForm', { coordinate: coordinate! })
          }
          isDisabled={!Boolean(coordinate)}
          mb={4}
        >
          {t('general.continue')}
        </Button>
      </Container>
    </>
  );
};
