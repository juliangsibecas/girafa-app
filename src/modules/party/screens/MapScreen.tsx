import React, { useState } from 'react';
import {
  BottomTabGradient,
  Box,
  Container,
  Logo,
  StateHandler,
} from '../../../components';
import { PartyMapPreview, usePartyFindQuery } from '../../../api';
import { PartyCarousel, PartyMap } from '../components';

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
        <Box hcenter flexGrow={1} pointerEvents="none">
          <Logo />
        </Box>
        <Box height={24}>
          <PartyCarousel
            idx={currentIdx}
            parties={parties}
            handleIdxChange={handleIdxChange}
          />
        </Box>
      </Container>
      <BottomTabGradient />
    </StateHandler>
  );
};
