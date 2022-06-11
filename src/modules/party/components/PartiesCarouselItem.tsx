import React from 'react';
import { Dimensions, Image } from 'react-native';
import { Box, Button, Icon, Text } from '../../../components';
import { useTheme } from '../../../theme';
import { FontFamily } from '../../../theme/text/types';
import image from '../../../../assets/images/onboarding.png';
import { Party } from '../../../api';

interface Props {
  party: Party;
}

export const PartiesCarouselItem: React.FC<Props> = ({ party }) => {
  const { theme } = useTheme();
  return (
    <Box width="screen" center>
      <Box bgColor="background" borderRadius={1} flex row height={20} my={2}>
        <Box
          position="absolute"
          top={-2}
          left={-2}
          width={12}
          borderRadius={1}
          overflow="hidden"
        >
          <Image
            source={image}
            style={{
              height: theme.spacing(24),
              minWidth: theme.spacing(12),
              transform: [{ translateX: -50 }],
            }}
          />
        </Box>
        <Box
          flex
          pl={12}
          pr={2}
          py={3}
          style={{
            minWidth: Dimensions.get('screen').width - theme.spacing(20),
          }}
        >
          <Box flexGrow={1}>
            <Text type="h2">{party.name}</Text>
            <Text>{party.organizer.nickname}</Text>
          </Box>
          <Box>
            <Text color="primary" fontFamily={FontFamily.SEMIBOLD}>
              {party.date}
            </Text>
            <Box position="absolute" bottom={-2} right={-2}>
              <Button height={6} width={6}>
                <Icon name="chevron-right" />
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
