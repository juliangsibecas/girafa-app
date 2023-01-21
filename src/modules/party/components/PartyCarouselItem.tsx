import React from 'react';
import { Dimensions } from 'react-native';
import { Box, Button, Icon, Text } from '../../../components';
import { useTheme } from '../../../theme';
import { FontFamily } from '../../../theme/text/types';
import { PartyMapPreview } from '../../../api';
import { useNavigation } from '@react-navigation/native';
import { formatDate } from '../../../utils';
import { HomeStackNavigationProp } from '../../../navigation';
import { PartyAvatar } from './PartyAvatar';

interface Props {
  party: PartyMapPreview;
}

export const PartyCarouselItem: React.FC<Props> = ({ party }) => {
  const { navigate } = useNavigation<HomeStackNavigationProp>();
  const { theme } = useTheme();
  return (
    <Box width="screen" center>
      <Box
        bgColor="disabled"
        borderRadius={1}
        row
        height={20}
        my={2}
        style={{ elevation: 8, maxWidth: Dimensions.get('screen').width * 0.8 }}
      >
        <Box
          position="absolute"
          top={-2}
          left={-2}
          width={12}
          borderRadius={1}
          overflow="hidden"
        >
          <Box
            style={{
              transform: [{ translateX: -theme.spacing(6) }],
            }}
          >
            <PartyAvatar
              id={party._id}
              height={24}
              minWidth={12}
              placeholderSize={7}
            />
          </Box>
        </Box>
        <Box
          pl={12}
          py={3}
          pr={2}
          style={{
            minWidth: Dimensions.get('screen').width - theme.spacing(20),
          }}
        >
          <Box flex={1}>
            <Text type="h2">{party.name}</Text>
            <Text>{party.organizerNickname}</Text>
          </Box>
          <Box>
            <Text color="primary" fontFamily={FontFamily.SEMIBOLD}>
              {formatDate(party.date)}
            </Text>
            <Box position="absolute" bottom={-2} right={-5}>
              <Button
                height={6}
                width={6}
                onPress={() =>
                  navigate('PartyDetail', {
                    id: party._id,
                  })
                }
              >
                <Icon
                  name="chevron-right"
                  color="background"
                  size={3}
                  weight={3}
                />
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
