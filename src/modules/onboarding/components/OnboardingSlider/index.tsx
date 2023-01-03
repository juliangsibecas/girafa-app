import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, ViewToken } from 'react-native';

import djImage from '../../../../assets/images/onboarding/dj.png';
import speakerImage from '../../../../assets/images/onboarding/speaker.png';
import calendarImage from '../../../../assets/images/onboarding/calendar.png';

import { Box, Image, Text } from '../../../../components';

type Step = 0 | 1 | 2;

const illustrations = [djImage, speakerImage, calendarImage];

export const OnboardingSlider: React.FC = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'onboarding.screens.Onboarding',
  });
  const [step, setStep] = useState<Step>(0);

  const onViewRef = React.useRef(
    (info: { viewableItems: Array<ViewToken> }) => {
      setStep(info.viewableItems[0].index as Step);
    }
  );

  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });

  return (
    <Box mx={-2}>
      <FlatList
        horizontal
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        legacyImplementation={false}
        data={[1, 2, 3]}
        renderItem={({ index }) => (
          <Box width="screen" center px={4}>
            <Image
              src={illustrations[index]}
              height={24}
              style={{ resizeMode: 'contain' }}
            />
            <Text type="h3" textCenter mt={2} mb={1}>
              {t(`${index as Step}.title`)}
            </Text>
            <Text textCenter lineHeight={20}>
              {t(`${index as Step}.description`)}
            </Text>
          </Box>
        )}
        viewabilityConfig={viewConfigRef.current}
        onViewableItemsChanged={onViewRef.current}
      />
      <Box flex row center mt={5}>
        <Box
          height={1}
          width={1}
          borderRadius={1}
          bgColor={step === 0 ? 'primary' : 'disabled'}
        />
        <Box
          ml={1}
          height={1}
          width={1}
          borderRadius={1}
          bgColor={step === 1 ? 'primary' : 'disabled'}
        />
        <Box
          ml={1}
          height={1}
          width={1}
          borderRadius={1}
          bgColor={step === 2 ? 'primary' : 'disabled'}
        />
      </Box>
    </Box>
  );
};
