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
import { TouchableOpacity } from 'react-native';

export const MapScreen: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(-1);
  const { data, loading: isLoading, error: isError } = usePartyFindQuery();

  const parties = (data?.partyFind ?? []) as Array<PartyMapPreview>;

  const handleIdxChange = (idx: number) => setCurrentIdx(idx);

  return (
    <StateHandler isLoading={isLoading} isError={Boolean(isError)}>
      <PartyMap
        parties={parties}
        idx={currentIdx}
        handleIdxChange={handleIdxChange}
      />
      <Container noHeader px={0} bgColor={undefined} pointerEvents="box-none">
        <Box flexGrow={1} pointerEvents="box-none" row>
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
            <Button borderRadius={8} height={4} width={4}>
              <Icon name="plus" color="text.primary" weight={4} />
            </Button>
          </Box>
        </Box>
        <Box height={24}>
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
