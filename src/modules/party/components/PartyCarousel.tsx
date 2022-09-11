import React, { useEffect, useRef } from 'react';
import { Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Box, Icon, Text } from '../../../components';
import { PartyMapPreview } from '../../../api';
import { useTheme } from '../../../theme';
import { FontFamily } from '../../../theme/text/types';
import { PartyCarouselItem } from './PartyCarouselItem';
import { useTranslation } from 'react-i18next';

interface Props {
  idx: number;
  parties: Array<PartyMapPreview>;
  handleIdxChange: (idx: number) => void;
}

export const PartyCarousel: React.FC<Props> = ({
  idx,
  parties,
  handleIdxChange,
}) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const carousel = useRef<Carousel<PartyMapPreview>>(null);

  useEffect(() => {
    carousel.current?.snapToItem(idx + 1);
  }, [idx]);

  return (
    <Carousel
      ref={carousel}
      sliderWidth={Dimensions.get('screen').width}
      itemWidth={Dimensions.get('screen').width}
      data={[{}, ...parties] as Array<PartyMapPreview>}
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
                  backgroundColor: `${theme.palette.primary.main}BB`,
                  opacity: 0.8,
                }}
              >
                {parties.length > 0 ? (
                  <>
                    <Icon
                      name="chevron-left"
                      color={theme.palette.text.primary}
                      weight={3}
                    />
                    <Text
                      fontFamily={FontFamily.SEMIBOLD}
                      ml={2}
                      color={theme.palette.text.primary}
                    >
                      {t('party.components.Carousel.slideToSee')}
                    </Text>
                  </>
                ) : (
                  <Text
                    fontFamily={FontFamily.SEMIBOLD}
                    color={theme.palette.background.main}
                  >
                    {t('party.components.Carousel.notAvailable')}
                  </Text>
                )}
              </Box>
            </Box>
          );
        }

        return <PartyCarouselItem party={party} />;
      }}
      onSnapToItem={(i) => handleIdxChange(i - 1)}
    />
  );
};
