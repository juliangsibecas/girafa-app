import React, { useState } from 'react';
import { FlatList, ViewToken } from 'react-native';

import image from '../../../../assets/images/onboarding.png';

import { Box, Image, Text } from '../../../../components';

type Step = 0 | 1 | 2;

export const OnboardingSlider: React.FC = () => {
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
        renderItem={() => (
          <Box width="screen" center>
            <Image src={image} />
            <Text type="h4" mb={1}>
              Hola
            </Text>
            <Text>Que onda pa</Text>
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
