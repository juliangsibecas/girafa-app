import React, { useState } from 'react';
import { Box, Container, Logo, StateHandler } from '../../../components';
import { Party, usePartySearchQuery } from '../../../api';
import { PartiesCarousel, PartiesMap } from '../components';

export const MapScreen: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(-1);
  const { data, loading: isLoading, error: isError } = usePartySearchQuery();

  const parties = (data?.partySearch ?? []) as Array<Party>;

  const handleIdxChange = (idx: number) => setCurrentIdx(idx);

  return (
    <StateHandler isLoading={isLoading} isError={Boolean(isError)}>
      <PartiesMap
        idx={currentIdx}
        parties={parties}
        handleIdxChange={handleIdxChange}
      />
      <Container noHeader px={0} bgColor={undefined} pointerEvents="box-none">
        <Box hcenter flexGrow={1} pointerEvents="none">
          <Logo />
        </Box>
        <Box height={24}>
          <PartiesCarousel
            idx={currentIdx}
            parties={parties}
            handleIdxChange={handleIdxChange}
          />
        </Box>
      </Container>
    </StateHandler>
  );
};
