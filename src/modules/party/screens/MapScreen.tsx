import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Icon,
  Logo,
  StateHandler,
} from '../../../components';
import { PartyMapPreview, usePartyFindQuery } from '../../../api';
import { PartyCarousel, PartyMap } from '../components';
import { useNavigation } from '@react-navigation/native';
import { HomeStackScreenProps } from '../../../navigation';
import { isIOS } from '../../../utils';

export const MapScreen: React.FC = () => {
  const { navigate } =
    useNavigation<HomeStackScreenProps<'Map'>['navigation']>();
  const { data, loading: isLoading, error: isError } = usePartyFindQuery();
  const [currentIdx, setCurrentIdx] = useState(-1);

  const parties = (data?.partyFind ?? []) as Array<PartyMapPreview>;

  const handleIdxChange = (idx: number) => setCurrentIdx(idx);

  return (
    <StateHandler isLoading={isLoading} isError={Boolean(isError)}>
      <PartyMap
        parties={parties}
        idx={currentIdx}
        handleIdxChange={handleIdxChange}
      />
      <Container
        noHeader
        px={0}
        bgColor={undefined}
        pointerEvents="box-none"
        style={{ justifyContent: 'space-between' }}
      >
        <Box pointerEvents="box-none" row>
          <Box flexGrow={1} />
          <Box hcenter flexGrow={1}>
            <Logo />
          </Box>
          <Box
            flexGrow={1}
            mr={2}
            ml={-6}
            style={{ alignItems: 'flex-end' }}
            pointerEvents="auto"
          >
            <Button
              borderRadius={8}
              height={4}
              width={4}
              onPress={() => navigate('PartyCreateForm')}
            >
              <Icon name="plus" color="background" weight={4} />
            </Button>
          </Box>
        </Box>
        <Box height={24} mb={4}>
          <PartyCarousel
            idx={currentIdx}
            parties={parties}
            handleIdxChange={handleIdxChange}
          />
        </Box>
      </Container>
    </StateHandler>
  );
};
