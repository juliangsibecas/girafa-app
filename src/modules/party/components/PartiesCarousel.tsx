import React, { useEffect, useRef } from 'react';
import { Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Box, Icon, Text } from '../../../components';
import { Party } from '../../../api';
import { useTheme } from '../../../theme';
import { FontFamily } from '../../../theme/text/types';
import { PartiesCarouselItem } from './PartiesCarouselItem';

interface Props {
  idx: number;
  parties: Array<Party>;
  handleIdxChange: (idx: number) => void;
}

export const PartiesCarousel: React.FC<Props> = ({
  idx,
  parties,
  handleIdxChange,
}) => {
  const carousel = useRef<Carousel<Party>>(null);
  const { theme } = useTheme();

  useEffect(() => {
    carousel.current?.snapToItem(idx + 1);
  }, [idx]);

  return (
    <Carousel
      ref={carousel}
      sliderWidth={Dimensions.get('screen').width}
      itemWidth={Dimensions.get('screen').width}
      data={[{}, ...parties] as Array<Party>}
      renderItem={({ item: party, index }) => {
        if (index === 0) {
          return (
            <Box center width="screen" style={{ height: '100%' }}>
              <Box
                flex
                row
                center
                py={1}
                px={1.5}
                borderRadius={2}
                style={{
                  backgroundColor: `${theme.palette.primary.main}66`,
                }}
              >
                <Icon name="arrow-left" color={theme.palette.background.main} />
                <Text
                  fontFamily={FontFamily.SEMIBOLD}
                  ml={2}
                  color={theme.palette.background.main}
                >
                  Deslizar para ver festicholas
                </Text>
              </Box>
            </Box>
          );
        }

        return <PartiesCarouselItem party={party} />;
      }}
      onSnapToItem={(i) => handleIdxChange(i - 1)}
    />
  );
};
