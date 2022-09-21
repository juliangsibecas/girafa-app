import React, { useRef } from 'react';
import MapView from 'react-native-maps';
import { PartyMapPreview } from '../../../api';
import { Box, INITIAL_REGION, Map } from '../../../components';
import { useEffectExceptOnMount } from '../../../hooks';

interface Props {
  idx: number;
  parties: Array<PartyMapPreview>;
  handleIdxChange: (idx: number) => void;
}

export const PartyMap: React.FC<Props> = ({
  idx,
  parties,
  handleIdxChange,
}) => {
  const map = useRef<MapView>();

  useEffectExceptOnMount(() => {
    map.current?.animateToRegion(
      idx === -1
        ? INITIAL_REGION
        : {
            ...parties[idx].coordinate,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008,
          }
    );
  }, [idx]);

  return (
    <Box position="absolute">
      <Map
        mapRef={map}
        markers={parties.map((party, i) => ({
          ...party,
          onPress: () => handleIdxChange(i),
        }))}
      />
    </Box>
  );
};
