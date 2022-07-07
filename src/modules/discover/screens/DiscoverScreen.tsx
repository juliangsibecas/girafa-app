import React, { useEffect, useState } from 'react';
import { usePartySearchLazyQuery, useUserSearchLazyQuery } from '../../../api';
import {
  Box,
  Container,
  ListSwitch,
  StateHandler,
  Text,
  TextInput,
} from '../../../components';
import { useDebounce } from '../../../hooks';
import { Maybe } from '../../../types';
import { DiscoverList } from '../components';

export const DiscoverScreen: React.FC = () => {
  const [
    searchUsers,
    { data: usersData, loading: isUsersLoading, error: usersError },
  ] = useUserSearchLazyQuery();
  const [
    searchParties,
    { data: partiesData, loading: isPartiesLoading, error: partiesError },
  ] = usePartySearchLazyQuery();

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);
  const [isCardsListMode, setCardsListMode] = useState(false);
  const [isShowingAll, setShowingAll] = useState<Maybe<'user' | 'party'>>();

  useEffect(() => {
    if (debouncedSearch.length > 2) {
      searchParties({ variables: { q: debouncedSearch } });
      searchUsers({ variables: { q: debouncedSearch } });
    }
  }, [debouncedSearch]);

  const users = usersData?.userSearch ?? [];
  const parties = partiesData?.partySearch ?? [];

  const handleShowAll = (status: boolean, value: 'user' | 'party') => {
    setShowingAll(status ? value : undefined);
    setCardsListMode(false);
  };

  return (
    <Container>
      <Box flex row center>
        <Text flexGrow={1} type="h1">
          Descubrir
        </Text>
        <Box flex center>
          <ListSwitch
            isCards={isCardsListMode}
            onSwitch={() => setCardsListMode(!isCardsListMode)}
            isDisabled={isShowingAll !== 'user'}
          />
        </Box>
      </Box>
      <Box mt={2} mb={4}>
        <TextInput
          placeholder="Buscar..."
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
      </Box>
      <StateHandler
        isLoading={isPartiesLoading || isUsersLoading}
        isError={Boolean(partiesError || usersError)}
      >
        {!isShowingAll || isShowingAll === 'user' ? (
          <DiscoverList
            type="user"
            data={users}
            isShowingAll={Boolean(isShowingAll)}
            isCardsListMode={isCardsListMode}
            showAll={(status: boolean) => handleShowAll(status, 'user')}
          />
        ) : undefined}
        {!isShowingAll ? <Box mt={4} /> : undefined}
        {!isShowingAll || isShowingAll === 'party' ? (
          <DiscoverList
            type="party"
            data={parties}
            isShowingAll={Boolean(isShowingAll)}
            isCardsListMode={isCardsListMode}
            showAll={(status: boolean) => handleShowAll(status, 'party')}
          />
        ) : undefined}
      </StateHandler>
    </Container>
  );
};
