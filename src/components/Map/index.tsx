import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import RNMap, {
  MapViewProps as RNMapProps,
  Marker as RNMarker,
  MarkerProps as RNMarkerProps,
  PROVIDER_GOOGLE,
} from 'react-native-maps';

import lightStyle from '../../assets/maps/light.json';
import darkStyle from '../../assets/maps/dark.json';

import { useTheme } from '../../theme';
import { Icon } from '../Icon';
import { Box } from '../Box';
import { Spinner } from '../Spinner';

type Props = {
  mapRef?: React.MutableRefObject<RNMap | undefined>;
  markers?: Array<RNMarkerProps>;
} & RNMapProps;

export const INITIAL_REGION = {
  latitude: -34.925,
  longitude: -57.955,
  latitudeDelta: 0.082,
  longitudeDelta: 0.082,
};

export const Marker: React.FC<RNMarkerProps> = (props) => (
  <RNMarker {...props}>
    <Icon name="map-pin" size={3} color="primary" isFilled />
  </RNMarker>
);

export const Map: React.FC<Props> = ({
  children,
  mapRef: ref,
  markers = [],
  ...props
}) => {
  const [isMapLoading, setMapLoading] = useState(true);
  const { isLightMode } = useTheme();

  useEffect(() => {
    const readyTimeout = setTimeout(() => {
      setMapLoading(false);
    }, 1000);

    const zoomTimeout = setTimeout(() => {
      ref?.current?.animateToRegion(INITIAL_REGION);
    }, 1000);

    return () => {
      clearTimeout(zoomTimeout);
      clearTimeout(readyTimeout);
    };
  }, []);

  return (
    <Box width="screen" height="screen">
      {isMapLoading && (
        <Box height="screen" width="screen" bgColor="background" center>
          <Spinner />
        </Box>
      )}
      <RNMap
        ref={ref as React.LegacyRef<RNMap>}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_REGION}
        showsUserLocation={false}
        style={{
          height: Dimensions.get('window').height,
          width: Dimensions.get('window').width,
        }}
        customMapStyle={isLightMode ? lightStyle : darkStyle}
        {...props}
      >
        {markers.map((marker, i) => (
          <Marker key={i} {...marker} />
        ))}
      </RNMap>
    </Box>
  );
};
