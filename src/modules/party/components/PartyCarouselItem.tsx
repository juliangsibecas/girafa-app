import React from 'react';
import { Dimensions } from 'react-native';
import { Box, Button, Icon, Image, Text } from '../../../components';
import { useTheme } from '../../../theme';
import { FontFamily } from '../../../theme/text/types';
import image from '../../../../assets/images/onboarding.png';
import { Party } from '../../../api';
import { useNavigation } from '@react-navigation/native';
import { formatDate } from '../../../utils';
import { HomeStackNavigationProp } from '../../../navigation';

interface Props {
  party: Party;
}

export const PartyCarouselItem: React.FC<Props> = ({ party }) => {
  const { navigate } = useNavigation<HomeStackNavigationProp>();
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
            src={image}
            height={24}
            minWidth={12}
            style={{
              transform: [{ translateX: -theme.spacing(6) }],
            }}
          />
        </Box>
        <Box
          flex
          pl={12}
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
              {formatDate(party.date)}
            </Text>
            <Box position="absolute" bottom={-2} right={-2}>
              <Button
                height={6}
                width={6}
                onPress={() =>
                  navigate('PartyDetail', {
                    id: party._id,
                  })
                }
              >
                <Icon name="chevron-right" />
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
