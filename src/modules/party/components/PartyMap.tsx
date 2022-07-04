import React, { useEffect, useRef } from 'react';
import { Dimensions } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Party } from '../../../api';
import { Box, Icon } from '../../../components';

interface Props {
  idx: number;
  parties: Array<Party>;
  handleIdxChange: (idx: number) => void;
}

const INITIAL_REGION = {
  latitude: -34.925,
  longitude: -57.955,
  latitudeDelta: 0.082,
  longitudeDelta: 0.082,
};

export const PartyMap: React.FC<Props> = ({
  idx,
  parties,
  handleIdxChange,
}) => {
  const map = useRef<MapView>();

  useEffect(() => {
    map.current?.animateToRegion(
      idx === -1
        ? INITIAL_REGION
        : {
            ...parties[idx].coordinates,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008,
          }
    );
  }, [idx]);

  return (
    <Box position="absolute">
      <MapView
        ref={map as React.LegacyRef<MapView>}
        initialRegion={INITIAL_REGION}
        style={{
          height: Dimensions.get('window').height,
          width: Dimensions.get('window').width,
        }}
      >
        {parties.map((party, i) => (
          <Marker
            key={i}
            coordinate={party.coordinates}
            onPress={() => handleIdxChange(i)}
          >
            <Icon name="map-marker" size={4} color="primary" />
          </Marker>
        ))}
      </MapView>
    </Box>
  );
};
