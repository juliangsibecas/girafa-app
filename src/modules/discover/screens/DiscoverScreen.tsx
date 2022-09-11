import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePartySearchLazyQuery, useUserSearchLazyQuery } from '../../../api';
import {
  Box,
  Container,
  ListSwitch,
  StateHandler,
  Text,
  TextInput,
} from '../../../components';
import { useDebounce, useEffectExceptOnMount } from '../../../hooks';
import { Maybe } from '../../../types';
import { DiscoverList } from '../components';

export const DiscoverScreen: React.FC = () => {
  const { t } = useTranslation();
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

  useEffectExceptOnMount(() => {
    if (debouncedSearch.length > 2) {
      searchParties({ variables: { q: debouncedSearch } });
      searchUsers({ variables: { q: debouncedSearch } });
    }
  }, [debouncedSearch]);

  const users = search ? usersData?.userSearch ?? [] : [];
  const parties = search ? partiesData?.partySearch ?? [] : [];

  const handleShowAll = (status: boolean, value: 'user' | 'party') => {
    setShowingAll(status ? value : undefined);
    setCardsListMode(false);
  };

  const shouldShowUsers =
    users.length > 0 && (!isShowingAll || isShowingAll === 'user');
  const shouldShowParties =
    parties.length > 0 && (!isShowingAll || isShowingAll === 'party');

  return (
    <Container>
      <Box flex row center>
        <Text flexGrow={1} type="h1">
          {t('general.discover')}
        </Text>
        <Box flex center>
          <ListSwitch
            isCards={isCardsListMode}
            onSwitch={() => setCardsListMode(!isCardsListMode)}
            isDisabled={!shouldShowUsers || shouldShowParties}
          />
        </Box>
      </Box>
      <Box mt={2} mb={4}>
        <TextInput
          placeholder={t('general.searchEllipsis')}
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
      </Box>
      <StateHandler
        isLoading={isPartiesLoading || isUsersLoading}
        isError={Boolean(partiesError || usersError)}
      >
        {shouldShowUsers ? (
          <DiscoverList
            type="user"
            data={users}
            isOnly={!shouldShowParties}
            isShowingAll={Boolean(isShowingAll)}
            isCardsListMode={isCardsListMode}
            showAll={(status: boolean) => handleShowAll(status, 'user')}
          />
        ) : undefined}
        {shouldShowUsers && shouldShowParties ? <Box mt={4} /> : undefined}
        {shouldShowParties ? (
          <DiscoverList
            type="party"
            data={parties}
            isOnly={!shouldShowUsers}
            isShowingAll={Boolean(isShowingAll) || !shouldShowUsers}
            isCardsListMode={isCardsListMode}
            showAll={(status: boolean) => handleShowAll(status, 'party')}
          />
        ) : undefined}
      </StateHandler>
    </Container>
  );
};
